/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Разрешаем сборку, даже если есть ошибки стиля
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Разрешаем сборку, даже если есть ошибки типов
    ignoreBuildErrors: true,
  },
};

export default nextConfig;