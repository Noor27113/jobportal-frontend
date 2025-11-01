export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ✅ Correct port
        changeOrigin: true,
        secure: false
      }
    }
  }
});
