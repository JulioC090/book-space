import eslintJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import turbo from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  // Recommended JavaScript configuration
  eslintJs.configs.recommended,

  // Recommended TypeScript configuration
  ...tseslint.configs.recommended,

  // Turbo-specific rules for monorepos
  turbo.configs['flat/recommended'],

  // Disables rules that conflict with Prettier
  prettierConfig,

  // Recommended rules from the Prettier plugin
  prettierPlugin,

  // Directories ignored by ESLint
  {
    ignores: ['node_modules', 'dist', '**/*.{js,cjs}'],
  },

  // Prettier custom rules
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          bracketSameLine: false,
          tabWidth: 2,
          endOfLine: 'auto',
        },
      ],
    },
  },

  {
    files: ['**/tests/**'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
]);
