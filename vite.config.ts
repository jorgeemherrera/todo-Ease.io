import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://jorgeemherrera.github.io/todo-Ease.io/',
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@context': path.resolve(__dirname, 'src/context'),
    }
  }
})
