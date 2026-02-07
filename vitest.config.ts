import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    globals: true,
    // Пропускаем E2E тесты в CI/CD, так как они требуют запущенный сервер
    exclude: process.env.CI || process.env.VERCEL 
      ? ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/.next/**'] 
      : ['**/node_modules/**', '**/dist/**', '**/.next/**'],
    testTimeout: 10000,
  },
})
