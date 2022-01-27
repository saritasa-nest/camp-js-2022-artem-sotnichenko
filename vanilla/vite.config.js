import { resolve } from 'path';
import { defineConfig } from 'vite';
import env from 'vite-plugin-env-compatible'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [
    env({
      prefix: ''
    }),
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(root, 'index.html'),
        resolve(root, 'auth', 'login', 'index.html'),
        resolve(root, 'auth', 'register', 'index.html'),
      ]
    }
  }
});
