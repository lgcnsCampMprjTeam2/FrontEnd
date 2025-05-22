import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    
],
  server: {
    proxy: {
      "/api": {
        target: "http://ec2-13-125-34-183.ap-northeast-2.compute.amazonaws.com", // 백엔드 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})