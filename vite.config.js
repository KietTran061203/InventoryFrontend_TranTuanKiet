import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Đảm bảo Vite xử lý fallback trong môi trường dev
  },
});