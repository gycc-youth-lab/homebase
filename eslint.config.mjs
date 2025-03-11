import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import stylisticJs from '@stylistic/eslint-plugin-js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'double'],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/semi': ['error', 'always'],
      'no-console': 'warn',
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/arrow-parens': ['error', 'as-needed'],
      '@stylistic/js/arrow-spacing': ['error', { 'before': true, 'after': true }],
      'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
      '@stylistic/js/eol-last' : ['error', 'always'],
    }
  }
];

export default eslintConfig;
