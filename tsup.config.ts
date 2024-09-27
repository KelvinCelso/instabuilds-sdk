import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'], // This will include all TypeScript files in src and its subdirectories
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  outDir: 'dist',
  target: 'es2020',
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    }
  },
});