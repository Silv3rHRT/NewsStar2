import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  server: {
    port: 10000,
    open: true,
    proxy: {
      '/api': { 
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/auth': { 
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
