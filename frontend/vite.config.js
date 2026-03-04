import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5170,
    proxy: {
  '/api': {
    target: 'http://47.84.115.117:8000',
    changeOrigin: true,
    // Baris di bawah ini menghapus '/api' saat dikirim ke server
    rewrite: (path) => path.replace(/^\/api/, ''), 
  },
},
  },
  // Handle client-side routing - serve index.html for all non-asset routes
  appType: 'spa',
})
