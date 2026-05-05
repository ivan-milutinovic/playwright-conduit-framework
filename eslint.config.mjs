import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  playwright.configs['flat/recommended'],
  {
    ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'playwright/.auth/'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'no-console': 'error'
    }
  }
);