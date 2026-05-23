import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "12.12.2.118" // ganti sesuai IP laptop kamu
  ]
};

export default nextConfig;