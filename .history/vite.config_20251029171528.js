import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000' // ✅ updated to match your backend port
    }
  }
});


server: {
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
