/// <reference types="vitest" />
import { AliasOptions, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ui": resolve(__dirname, "src/components/ui/"),
    } as AliasOptions,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vite.setup.ts'],
  },
});
