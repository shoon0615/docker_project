import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // docker 로 실행 시, 자동으로 Linux 환경의 기본 브라우저를 열기에 비활성화
  server: {
    open: false,
    // host: true,
    host: '0.0.0.0',
  },
})
