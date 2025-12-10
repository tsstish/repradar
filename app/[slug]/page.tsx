import type { Metadata } from 'next';
import { CLIENTS_DB } from './config';
import ClientPage from './ClientPage';

// 1. Эта функция создает красивую ссылку для WhatsApp
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const config = CLIENTS_DB[slug];

  if (!config) {
    return {
      title: 'Клиент не найден',
    };
  }

  return {
    title: config.name, // Заголовок в WhatsApp: "Тайский Рынок"
    description: config.sub, // Описание: "Лучшая уличная еда"
    openGraph: {
      title: config.name,
      description: 'Оставьте отзыв и получите подарок! 🎁',
      // Если есть лого, показываем его. Если нет - ничего.
      images: config.logo ? [config.logo] : [],
    },
  };
}

// 2. Это сама страница (просто запускает ClientPage)
export default function Page({ params }: { params: { slug: string } }) {
  return <ClientPage slug={params.slug} />;
}