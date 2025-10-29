import { defineconfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineconfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
});
