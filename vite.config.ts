import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
  plugins: [react()],
});
