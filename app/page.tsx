"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, TrendingUp, ChevronRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-orange-500 selection:text-white overflow-hidden relative">
      
      {/* ФОНОВЫЕ ЭФФЕКТЫ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      {/* HEADER */}
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          RepRadar
        </div>
        <a href="https://wa.me/972555555555" className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all text-sm font-medium">
          Связаться с нами
        </a>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 lg:py-32 max-w-4xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-orange-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          AI-Система защиты репутации
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent"
        >
          Превращаем гостей <br /> в <span className="text-orange-500">5 звезд в Google</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Умный QR-код перехватывает негативные отзывы до публикации в интернет, а довольных клиентов мотивирует ставить 5 звезд. Рост рейтинга гарантирован.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a href="/beauty" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-xl font-bold text-lg transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 group">
            Смотреть Демо (Салон) <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>
          </a>
          <a href="/thai" className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold text-lg transition-all flex items-center justify-center">
            Демо (Ресторан)
          </a>
        </motion.div>

        {/* TRUST BADGES */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Можно добавить логотипы клиентов, если будут */}
        </div>

      </section>

      {/* FEATURES GRID */}
      <section className="px-6 py-20 bg-slate-900/50 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
                { icon: ShieldCheck, title: "Фильтр Негатива", text: "Жалобы уходят вам в Telegram, а не в Google Maps.", color: "text-green-400" },
                { icon: Star, title: "Рост Рейтинга", text: "Только довольные клиенты попадают на страницу отзывов.", color: "text-yellow-400" },
                { icon: TrendingUp, title: "Возврат Клиентов", text: "Дарим скидку недовольным, чтобы они вернулись снова.", color: "text-blue-400" }
            ].map((item, i) => (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-8 rounded-3xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                    <div className={`w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 ${item.color}`}>
                        <item.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.text}</p>
                </motion.div>
            ))}
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-slate-900">
        © 2025 RepRadar. Haifa, Israel.
      </footer>
    </main>
  );
}