import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    https: {
      key: process.env.SSL_KEY_PATH,
      cert: process.env.SSL_CERT_PATH,
    },
  },
  server: {
    https: {
      key: process.env.SSL_KEY_PATH,
      cert: process.env.SSL_CERT_PATH,
    },
  },
  plugins: [react()],
});
