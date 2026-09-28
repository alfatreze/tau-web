import { defineConfig } from 'vite';

export default defineConfig({
  // Relative paths work both on GitHub Pages' /tau-web/ project URL and at a
  // custom domain's root without needing a deployment-specific rebuild.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        technical: 'technical.html',
      },
    },
  },
});
