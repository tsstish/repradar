import { UtensilsCrossed, Scissors } from "lucide-react";

// Твой Токен Бота
export const TELEGRAM_TOKEN = "8565200728:AAG9sAXuAjx79bVjacs8NeYS1pAI9Uj93Pk"; 

export const CLIENTS_DB: Record<string, any> = {
  // 1. ТАЙСКИЙ РЫНОК
  "thai": {
    name: "התאילנדית בשוק",
    sub: "התאילנדית בשוק",
    logo: "/thai-logo.png",   
    backgroundImage: "/thai-bg.jpg", 
    telegramChatId: "6132082486", 
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJ3__dTNG7HRURVS_EbdpySNg",
    easyLink: "https://easy.co.il/en/page/10116028", 
    icon: UtensilsCrossed, 
    theme: "orange", 
    bgIcons: ["🍜", "🍤", "🍣", "🥢", "🍋", "🌶️", "🥥", "🍱"]
  },

  // 2. САЛОН КРАСОТЫ
  "beauty": {
    name: "Beauty space",
    sub: "Студия эстетики",
    // logo: "/beauty-logo.png", 
    // backgroundImage: "/beauty-bg.jpg", 
    telegramChatId: "6132082486", 
    googleLink: "https://search.google.com/local/writereview?placeid=ChIJ8Ypmxe27HRURHw7L8PfgLHU",
    easyLink: "", 
    icon: Scissors, 
    theme: "pink", 
    bgIcons: ["💇‍♀️", "💅", "💄", "🌸", "✨", "🧴", "🎀", "💖"]
  }
};