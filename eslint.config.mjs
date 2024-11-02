import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    plugins: {},
  },
  pluginJs.configs.recommended, // Includes recommended rules for JavaScript
  ...tseslint.configs.recommended, // Includes recommended rules for TypeScript
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'warn', // Enforces Prettier formatting as an warning
      eqeqeq: 'error', // Use of the type-safe equality operators === and !==
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  { ignores: ['.node_modules/*', 'dist/*', 'build/*', 'public/*'] },
];

// https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file
// https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
// .eslintrc is legacy config !!!
