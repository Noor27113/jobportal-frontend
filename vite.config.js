// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Required for React projects

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ✅ Local backend for dev
        changeOrigin: true,
        secure: false
      }
    }
  }
});
