import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const target = 'http://localhost:8080';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {}, 
  },
  
  server: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        secure: false, 
      },
    },
    port: 5173,
  },
});
