"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Gift, Percent, MapPin, Globe } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CLIENTS_DB, TELEGRAM_TOKEN } from "./config";

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// ==========================================
// 📝 ПЕРЕВОДЫ
// ==========================================
const translations = {
  ru: { 
    title: "Вам понравилось?", 
    lowRatingTitle: "Мы хотим стать лучше!",
    lowRatingText: "Расскажите, что пошло не так. Мы подарим вам СКИДКУ 10% на следующее посещение.",
    placeholder: "Что можно улучшить?",
    sendButton: "Отправить и получить скидку", 
    highRatingTitle: "Спасибо, что выбираете нас!",
    highRatingText: "Оставьте отзыв, и мы подарим вам приятный комплимент при следующем визите.",
    btnGoogle: "Оставить отзыв в Google",
    btnEasy: "Оставить отзыв в Easy",
    discountTitle: "Скидка 10% ваша!",
    discountText: "Сделайте скриншот и покажите администратору.",
    giftTitle: "Подарок ждет вас!",
    giftText: "Спасибо за теплые слова! Покажите этот экран администратору.",
    lang: "Язык"
  },
he: { 
    title: "נהניתם?", // Знак вопроса в конце (слева)
    lowRatingTitle: "חשוב לנו להשתפר!", 
    lowRatingText: "ספרו לנו מה קרה, וקבלו 10% הנחה לטיפול הבא.", 
    placeholder: "מה אפשר לשפר?", 
    sendButton: "שלח וקבל הנחה", 
    highRatingTitle: "תודה שבחרתם בנו!", 
    highRatingText: "כתבו ביקורת וקבלו הפתעה מפנקת בביקור הבא.", 
    btnGoogle: "ביקורת ב-Google",
    btnEasy: "ביקורת ב-Easy",
    discountTitle: "הנחה 10% התקבלה!", 
    discountText: "צלמו מסך והראו לאדמיניסטרטור בביקור הבא.", 
    giftTitle: "המתנה מחכה לכם!", 
    giftText: "תודה על הפרגון! הראו מסך זה בקבלה.", 
    lang: "שפה"
  },
  en: { 
    title: "Did you enjoy it?", 
    lowRatingTitle: "We want to do better!",
    lowRatingText: "Tell us what went wrong. Enjoy a 10% DISCOUNT on your next visit.",
    placeholder: "What can we improve?",
    sendButton: "Get Discount", 
    highRatingTitle: "Thanks for choosing us!",
    highRatingText: "Leave a review and receive a lovely treat on your next visit.",
    btnGoogle: "Review on Google",
    btnEasy: "Review on Easy",
    discountTitle: "10% Discount Active!",
    discountText: "Screenshot this and show it to the admin next time.",
    giftTitle: "Your Gift is Ready!",
    giftText: "Thanks for the love! Show this screen at the reception.",
    lang: "Language"
  }
};

export default function ClientPage({ slug }: { slug: string }) {
  const config = CLIENTS_DB[slug]; 

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // ПО УМОЛЧАНИЮ МОЖНО ПОСТАВИТЬ "he", ЕСЛИ ХОЧЕШЬ ПРОВЕРИТЬ
  const [locale, setLocale] = useState<"ru"|"he"|"en">("ru"); 
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [rewardType, setRewardType] = useState<"discount" | "gift">("gift"); 
  const [iconPositions, setIconPositions] = useState<{top: number, left: number, rotate: number}[]>([]);

  useEffect(() => {
    setMounted(true);
    if (config) {
        const positions = config.bgIcons.map(() => ({
          top: Math.random() * 90, 
          left: Math.random() * 90, 
          rotate: Math.random() * 360
        }));
        setIconPositions(positions);
    }
  }, [config]);

  if (!config) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-bold">Client Not Found (404)</div>;
  if (!mounted) return null;

  const t = translations[locale];
  const Icon = config.icon;
  const isPink = config.theme === 'pink';

  const bgGradient = isPink
    ? "bg-gradient-to-br from-[#FFF0F5] via-[#FFE4E1] to-[#FFC0CB]"
    : "bg-gradient-to-br from-[#FFF8F0] via-[#FFE4D6] to-[#FFD6C9]";

  const cardShadow = isPink 
    ? "shadow-[0_20px_60px_-15px_rgba(255,105,180,0.3)]"
    : "shadow-[0_20px_60px_-15px_rgba(251,146,60,0.3)]";

  const buttonGradient = isPink
    ? "from-pink-400 to-rose-500 shadow-pink-200"
    : "from-orange-500 to-rose-500 shadow-orange-200";

  const starGradientId = isPink ? "pink-gradient" : "gold-gradient";
  // ЗАМЕНИЛ text-left НА text-start (УМНОЕ ВЫРАВНИВАНИЕ)
  const badBoxClass = isPink ? "bg-rose-50 border-rose-100 text-rose-900" : "bg-red-50 border-red-100 text-red-900";
  const goodBoxClass = isPink ? "bg-pink-50 border-pink-100 text-pink-900" : "bg-orange-50 border-orange-100 text-orange-900";

  const handleBadSubmit = async () => {
    setRewardType("discount");
    const text = `🤬 *Жалоба (${config.name})*\n⭐: ${rating}\n💬: ${comment || "Без текста"}`;
    setIsSubmitted(true);
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: config.telegramChatId, text: text, parse_mode: "Markdown" })
      });
    } catch (e) {}
  };

  const handleGoodClick = () => {
      setRewardType("gift");
      setIsSubmitted(true);
  };

  return (
    // ГЛАВНОЕ ИСПРАВЛЕНИЕ: dir={rtl/ltr} управляет всем направлением
    <main 
      className={`min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans ${bgGradient}`} 
      dir={locale === 'he' ? 'rtl' : 'ltr'}
    >
      <svg width="0" height="0" className="absolute">
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#fbbf24" offset="0%" />
          <stop stopColor="#d97706" offset="100%" />
        </linearGradient>
        <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#F472B6" offset="0%" />
          <stop stopColor="#E11D48" offset="100%" />
        </linearGradient>
      </svg>

      <div className="fixed inset-0 pointer-events-none z-0">
        {config.backgroundImage ? (
          <>
            <img src={config.backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[5px] scale-105" />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          iconPositions.map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute text-5xl mix-blend-multiply ${isPink ? 'opacity-30' : 'opacity-40'}`}
              style={{ top: `${pos.top}%`, left: `${pos.left}%`, rotate: pos.rotate }}
              animate={{ y: [0, -30, 0], rotate: [pos.rotate, pos.rotate + 15, pos.rotate] }}
              transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              {config.bgIcons[i]}
            </motion.div>
          ))
        )}
      </div>

      <div className="z-10 w-full max-w-md flex flex-col gap-6">
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center text-center gap-5">
            <div className="w-28 h-28 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl flex items-center justify-center p-1.5 relative overflow-hidden ring-4 ring-white/30">
                {config.logo ? (
                    <img src={config.logo} alt={config.name} className="w-full h-full object-contain rounded-[1.6rem]" />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${buttonGradient} rounded-[1.6rem] flex items-center justify-center shadow-inner`}>
                        <Icon className="w-12 h-12 text-white" strokeWidth={2} />
                    </div>
                )}
            </div>
            
            <div className="flex flex-col items-center justify-center text-center mt-2">
                <h1 className="text-4xl font-black text-white tracking-tight leading-tight drop-shadow-[0_3px_3px_rgba(0,0,0,1)] mb-2">
                    {config.name}
                </h1>
                <p className="text-white font-bold text-xs uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                    {config.sub}
                </p>
            </div>
        </motion.div>

        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 ${cardShadow}`}>
            {!isSubmitted && (
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-50/50 p-1 rounded-full flex gap-1 border border-gray-100/50">
                        {["ru", "he", "en"].map((l) => (
                            <button key={l} onClick={() => setLocale(l as any)} className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all duration-300 ${locale === l ? 'bg-white text-gray-800 shadow-md transform scale-105' : 'text-gray-400 hover:text-gray-600'}`}>
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {!isSubmitted ? (
                <>
                    <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-8">{t.title}</h2>
                    
                    {/* ЗВЕЗДЫ ВСЕГДА LTR (1 слева, 5 справа), так принято даже в Израиле */}
                    <div className="flex justify-center gap-2 mb-10" dir="ltr">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const isActive = star <= rating;
                            return (
                                <motion.button key={star} whileHover={{ scale: 1.2, rotate: 8 }} whileTap={{ scale: 0.85, rotate: -8 }} onClick={() => setRating(star)} className="focus:outline-none relative">
                                    <Star fill={isActive ? `url(#${starGradientId})` : "none"} className={`w-12 h-12 transition-all duration-300 ${isActive ? "text-transparent" : "text-gray-300 hover:text-gray-400"}`} strokeWidth={2} />
                                </motion.button>
                            );
                        })}
                    </div>

                    <AnimatePresence mode="wait">
                        {rating > 0 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key={rating <= 3 ? "low" : "high"}>
                                {rating <= 3 ? (
                                    <div className="space-y-4 pt-2">
                                        {/* text-left заменено на text-start: Слева для RU/EN, Справа для HE */}
                                        <div className={`p-4 rounded-2xl border text-start ${badBoxClass}`}>
                                            <h3 className="font-bold text-sm mb-1">{t.lowRatingTitle}</h3>
                                            <p className="text-xs leading-relaxed opacity-80">{t.lowRatingText}</p>
                                        </div>
                                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t.placeholder} className="w-full p-4 rounded-2xl bg-white border-0 text-gray-900 text-sm focus:ring-2 focus:ring-gray-300 outline-none resize-none h-28 placeholder:text-gray-400 shadow-inner" />
                                        <motion.button whileTap={{ scale: 0.98 }} onClick={handleBadSubmit} className="w-full py-4 rounded-2xl font-bold text-white bg-slate-800 flex items-center justify-center gap-2 shadow-xl hover:bg-black transition-all">
                                            <Percent size={18}/> {t.sendButton}
                                        </motion.button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 pt-2">
                                        {/* text-left заменено на text-start */}
                                        <div className={`p-4 rounded-2xl border text-start ${goodBoxClass}`}>
                                            <h3 className="font-bold text-sm mb-1">{t.highRatingTitle}</h3>
                                            <p className="text-xs leading-relaxed opacity-80">{t.highRatingText}</p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            {config.googleLink && (
                                                <motion.a href={config.googleLink} target="_blank" rel="noreferrer noopener" whileTap={{ scale: 0.98 }} onClick={handleGoodClick} className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center gap-2 shadow-xl shadow-blue-200 hover:opacity-90 transition-all cursor-pointer no-underline">
                                                    <Globe size={18}/> <span>{t.btnGoogle}</span>
                                                </motion.a>
                                            )}
                                            {config.easyLink && (
                                                <motion.a href={config.easyLink} target="_blank" rel="noreferrer noopener" whileTap={{ scale: 0.98 }} onClick={handleGoodClick} className="w-full py-4 rounded-2xl font-bold text-gray-900 bg-yellow-400 flex items-center justify-center gap-2 shadow-xl shadow-yellow-200 hover:bg-yellow-500 transition-all cursor-pointer no-underline">
                                                    <MapPin size={18}/> <span>{t.btnEasy}</span>
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-12 flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner ${rewardType === 'gift' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {rewardType === 'gift' ? <Gift className="w-12 h-12 text-green-600 animate-bounce" /> : <Percent className="w-12 h-12 text-red-600" />}
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{rewardType === 'gift' ? t.giftTitle : t.discountTitle}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[250px] mx-auto text-center">{rewardType === 'gift' ? t.giftText : t.discountText}</p>
                    <div className="mt-8 p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl w-full text-center">
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Coupon</div>
                        <div className="text-lg font-black text-gray-800">{rewardType === 'gift' ? "FREE GIFT" : "-10% DISCOUNT"}</div>
                    </div>
                </motion.div>
            )}
        </motion.div>
      </div>

      <div className="absolute bottom-6 text-white/30 text-[10px] font-bold tracking-widest uppercase z-10">
        Powered by RepRadar
      </div>
    </main>
  );
}