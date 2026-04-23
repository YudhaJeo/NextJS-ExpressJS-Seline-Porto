// next.config.ts  (atau next.config.js)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ✅ FIX gambar burik: naikkan quality default ke 90
    qualities: [75, 90, 100],
    // Format modern untuk kualitas lebih baik
    formats: ["image/avif", "image/webp"],
    // Ukuran device yang didukung
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;