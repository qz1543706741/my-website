import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import * as mdx from 'eslint-plugin-mdx';
import eslintMdxParser from 'eslint-mdx';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', '.astro'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat['jsx-runtime'],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-irregular-whitespace': ['error', { skipJSXText: true }],
      'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
      'react/self-closing-comp': ['error'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Astro
  ...eslintPluginAstro.configs.recommended,
  {
    ...mdx.flat,
    files: ['**/*.mdx'],
    languageOptions: {
      parser: eslintMdxParser,
    },
    // optional, if you want to lint code blocks at the same
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      languageMapper: false,
    }),
  },
  {
    ...mdx.flatCodeBlocks,
    languageOptions: {
      parser: eslintMdxParser,
    },
    files: ['**/*.mdx'],
    rules: {
      ...mdx.flatCodeBlocks.rules,
      // if you want to override some rules for code blocks
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
);
