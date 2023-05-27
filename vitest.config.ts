import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: [
      'dotenv/config',
      'backend/tests/setup.ts',
      'frontend/tests/setup.ts',
    ],
    testTimeout: 30000,
  },
});
