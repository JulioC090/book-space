import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import base from './base.js';

const compat = new FlatCompat();

export default tseslint.config(
  ...base,

  {
    files: ['**/*.{ts,tsx}'],
  },

  {
    ignores: ['.next'],
  },

  // Language and global environment settings
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },

  ...compat.config({
    extends: ['next/core-web-vitals'],
    rules: {
      'import/no-anonymous-default-export': 'off',
      '@next/next/no-html-link-for-pages': ['error', 'projects/web/.'],
    }
  }),
);
