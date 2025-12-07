"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ExternalLink, Star, UtensilsCrossed, Globe, CheckCircle2, Gift, Percent } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ==========================================
// ⚙️ НАСТРОЙКИ
// ==========================================
const RESTAURANT_CONFIG = {
  name: "Тайский Рынок", 
  sub: "Лучшая уличная еда",
  
  // КЛЮЧИ:
  telegramToken: "8565200728:AAG9sAXuAjx79bVjacs8NeYS1pAI9Uj93Pk", 
  telegramChatId: "6132082486", 
  
  // ССЫЛКА НА ГУГЛ:
  googleLink: "https://search.google.com/local/writereview?placeid=ChIJ3__dTNG7HRURVS_EbdpySNg", 
  
  IconComponent: UtensilsCrossed, 
  bgIcons: ["🍜", "🍤", "🍣", "🥢", "🍋", "🌶️", "🥥", "🍱"] 
};

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// ==========================================
// 📝 ПРОДАЮЩИЕ ТЕКСТЫ
// ==========================================
const translations = {
  ru: { 
    title: "Вам понравилось?", 
    
    // Сценарий: Плохо (Скидка)
    lowRatingTitle: "Давайте мириться!",
    lowRatingText: "Мы допустили ошибку, но хотим её исправить. Ваша СКИДКА 10% на всё меню уже готова.",
    placeholder: "Что именно пошло не так?",
    sendButton: "Получить скидку 10%", 
    
    // Сценарий: Хорошо (Подарок)
    highRatingTitle: "У вас отличный вкус!",
    highRatingText: "Поделитесь впечатлениями в Google и получите вкусный КОМПЛИМЕНТ от шефа при следующем заказе.",
    googleButton: "Забрать подарок", 
    
    // Финал (Скидка)
    discountTitle: "Скидка 10% активирована!",
    discountText: "Сделайте скриншот или покажите этот экран официанту при следующем заказе.",
    
    // Финал (Подарок)
    giftTitle: "Ваш подарок ждет!",
    giftText: "Спасибо за отзыв! Покажите этот экран официанту и получите ваш комплимент.",
    
    lang: "Язык"
  },
  he: { 
    title: "?נהניתם", 
    lowRatingTitle: "!בואו נשלים",
    lowRatingText: ".אנחנו רוצים לתקן את הרושם. קבלו 10% הנחה על כל התפריט לביקור הבא",
    placeholder: "?מה פחות אהבתם",
    sendButton: "לקבלת 10% הנחה", 
    highRatingTitle: "!יש לכם טעם מעולה",
    highRatingText: "!שתפו את החוויה ב-Google וקבלו קינוח מתנה בביקור הבא",
    googleButton: "לקבלת המתנה", 
    discountTitle: "!הנחה 10% הופעלה",
    discountText: ".צלמו מסך או הראו את ההודעה למלצר בביקור הבא",
    giftTitle: "!המתנה שלכם מחכה",
    giftText: ".תודה על הביקורת! הראו מסך זה למלצר לקבלת הפינוק",
    lang: "שפה"
  },
  en: { 
    title: "Did you enjoy it?", 
    lowRatingTitle: "Let's make up!",
    lowRatingText: "We want to fix our mistake. Your 10% DISCOUNT for the next visit is ready.",
    placeholder: "What went wrong?",
    sendButton: "Get 10% Discount", 
    highRatingTitle: "You have great taste!",
    highRatingText: "Share your thoughts on Google and get a delicious COMPLIMENT on us next time.",
    googleButton: "Claim Your Gift", 
    discountTitle: "10% Discount Active!",
    discountText: "Screenshot this or show it to your waiter next time.",
    giftTitle: "Your Gift is Ready!",
    giftText: "Thanks for the review! Show this screen to the waiter to get your treat.",
    lang: "Language"
  },
};

export default function Page() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [locale, setLocale] = useState<"ru"|"he"|"en">("ru");
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // true когда всё готово
  const [rewardType, setRewardType] = useState<"discount" | "gift">("gift"); // Какой тип награды показывать
  const [iconPositions, setIconPositions] = useState<{top: number, left: number, rotate: number}[]>([]);

  useEffect(() => {
    setMounted(true);
    const positions = RESTAURANT_CONFIG.bgIcons.map(() => ({
      top: Math.random() * 90, 
      left: Math.random() * 90, 
      rotate: Math.random() * 360
    }));
    setIconPositions(positions);
  }, []);

  if (!mounted) return null;

  const t = translations[locale];
  const Icon = RESTAURANT_CONFIG.IconComponent;

  const handleSubmit = async () => {
    // ЛОГИКА 1: Плохой отзыв -> Телеграм -> Скидка
    if (rating <= 3) {
      setRewardType("discount");
      const text = `🤬 *Жалоба (Клиент ждет скидку 10%)*\n🏢: ${RESTAURANT_CONFIG.name}\n⭐: ${rating}\n💬: ${comment || "Без текста"}`;
      try {
        await fetch(`https://api.telegram.org/bot${RESTAURANT_CONFIG.telegramToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: RESTAURANT_CONFIG.telegramChatId, text: text, parse_mode: "Markdown" })
        });
      } catch (e) {}
      setIsSubmitted(true);
    } 
    // ЛОГИКА 2: Хороший отзыв -> Гугл (новая вкладка) -> Экран "Подарок"
    else {
      setRewardType("gift");
      // Открываем Гугл в новой вкладке
      window.open(RESTAURANT_CONFIG.googleLink, '_blank');
      // А на этом экране СРАЗУ показываем "Подарок"
      setIsSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans bg-gradient-to-br from-[#FFF8F0] via-[#FFE4D6] to-[#FFD6C9]" dir={locale === 'he' ? 'rtl' : 'ltr'}>
      
      {/* SVG-ГРАДИЕНТ ЗОЛОТА */}
      <svg width="0" height="0" className="absolute">
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#fbbf24" offset="0%" />
          <stop stopColor="#d97706" offset="100%" />
        </linearGradient>
      </svg>

      {/* ФОН */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {iconPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl opacity-40 mix-blend-multiply"
            style={{ top: `${pos.top}%`, left: `${pos.left}%`, rotate: pos.rotate }}
            animate={{ 
              y: [0, -25, 0],
              rotate: [pos.rotate, pos.rotate + 10, pos.rotate]
            }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {RESTAURANT_CONFIG.bgIcons[i]}
          </motion.div>
        ))}
      </div>

      {/* КОНТЕНТ */}
      <div className="z-10 w-full max-w-md flex flex-col gap-6">
        
        {/* Шапка */}
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center text-center gap-5">
            <div className="w-24 h-24 bg-white/60 backdrop-blur-md rounded-[2rem] shadow-xl shadow-orange-500/20 flex items-center justify-center p-1 border border-white">
                <div className="w-full h-full bg-gradient-to-br from-orange-500 to-rose-500 rounded-[1.8rem] flex items-center justify-center shadow-inner">
                    <Icon className="w-11 h-11 text-white" strokeWidth={2.5} />
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight drop-shadow-sm">
                    {RESTAURANT_CONFIG.name}
                </h1>
                <p className="text-orange-900/60 font-bold text-xs mt-1.5 uppercase tracking-widest">
                    {RESTAURANT_CONFIG.sub}
                </p>
            </div>
        </motion.div>

        {/* Карточка */}
        <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(251,146,60,0.15)] border border-white p-8"
        >
            {/* Переключатель языков (скрываем на финальном экране) */}
            {!isSubmitted && (
                <div className="flex justify-center mb-8">
                    <div className="bg-orange-50/50 p-1 rounded-full flex gap-1 border border-orange-100/50">
                        {["ru", "he", "en"].map((l) => (
                            <button key={l} onClick={() => setLocale(l as any)} className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all duration-300 ${locale === l ? 'bg-white text-orange-600 shadow-md transform scale-105' : 'text-gray-400 hover:text-gray-600'}`}>
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {!isSubmitted ? (
                <>
                    <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-8">{t.title}</h2>
                    
                    {/* Звезды */}
                    <div className="flex justify-center gap-2 mb-10" dir="ltr">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const isActive = star <= rating;
                            return (
                                <motion.button 
                                    key={star}
                                    whileHover={{ scale: 1.2, rotate: 8 }}
                                    whileTap={{ scale: 0.85, rotate: -8 }}
                                    animate={{ 
                                        scale: isActive ? 1.15 : 1,
                                        filter: isActive ? "drop-shadow(0px 4px 8px rgba(251, 191, 36, 0.4))" : "none"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none relative"
                                >
                                    <Star 
                                        fill={isActive ? "url(#gold-gradient)" : "none"}
                                        className={`w-12 h-12 transition-all duration-300 ${isActive ? "text-transparent" : "text-orange-200 hover:text-orange-400"}`} 
                                        strokeWidth={2} 
                                    />
                                </motion.button>
                            );
                        })}
                    </div>

                    <AnimatePresence mode="wait">
                        {rating > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                key={rating <= 3 ? "low" : "high"}
                            >
                                {rating <= 3 ? (
                                    // 1-3 ЗВЕЗДЫ
                                    <div className="space-y-4 pt-2">
                                        <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-left">
                                            <h3 className="font-bold text-red-900 text-sm mb-1">{t.lowRatingTitle}</h3>
                                            <p className="text-red-700/80 text-xs leading-relaxed">{t.lowRatingText}</p>
                                        </div>
                                        <textarea 
                                            value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t.placeholder}
                                            className="w-full p-4 rounded-2xl bg-white border-0 text-gray-900 text-sm focus:ring-2 focus:ring-orange-400 outline-none resize-none h-28 placeholder:text-gray-400 shadow-inner"
                                        />
                                        <motion.button whileTap={{ scale: 0.98 }} onClick={handleSubmit} className="w-full py-4 rounded-2xl font-bold text-white bg-slate-800 flex items-center justify-center gap-2 shadow-xl shadow-slate-300/50 hover:bg-black transition-all">
                                            <Percent size={18}/> {t.sendButton}
                                        </motion.button>
                                    </div>
                                ) : (
                                    // 4-5 ЗВЕЗД
                                    <div className="space-y-4 pt-2">
                                        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 text-left">
                                            <h3 className="font-bold text-orange-900 text-sm mb-1">{t.highRatingTitle}</h3>
                                            <p className="text-orange-700/80 text-xs leading-relaxed">{t.highRatingText}</p>
                                        </div>
                                        <motion.button whileTap={{ scale: 0.98 }} onClick={handleSubmit} className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center gap-2 shadow-xl shadow-orange-200 hover:opacity-90 transition-all">
                                            <Gift size={18}/> {t.googleButton}
                                        </motion.button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                // --- ФИНАЛЬНЫЙ ЭКРАН (НАГРАДА) ---
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="py-12 flex flex-col items-center"
                >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner ${rewardType === 'gift' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {rewardType === 'gift' ? (
                            <Gift className="w-12 h-12 text-green-600 animate-bounce" />
                        ) : (
                            <Percent className="w-12 h-12 text-red-600" />
                        )}
                    </div>
                    
                    <h2 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                        {rewardType === 'gift' ? t.giftTitle : t.discountTitle}
                    </h2>
                    
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[250px] mx-auto">
                        {rewardType === 'gift' ? t.giftText : t.discountText}
                    </p>

                    {/* Визуальная "карточка" награды */}
                    <div className="mt-8 p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl w-full">
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">RepRadar Coupon</div>
                        <div className="text-lg font-black text-gray-800">
                            {rewardType === 'gift' ? "FREE DESSERT" : "-10% DISCOUNT"}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
      </div>

      <div className="absolute bottom-6 text-orange-900/20 text-[10px] font-bold tracking-widest uppercase">
        Powered by RepRadar
      </div>
    </main>
  );
}