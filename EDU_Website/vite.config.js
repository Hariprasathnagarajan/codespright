// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or vue, svelte, etc.
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
