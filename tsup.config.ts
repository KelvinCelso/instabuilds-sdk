import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Main entry point of your SDK
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true, // Generate TypeScript declaration files
  format: ['cjs', 'esm'], // Output both CommonJS and ES module
  outDir: 'dist', // Output directory
  target: 'es2020', // Specify your target JavaScript version
});