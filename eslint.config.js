import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: js.configs.recommended.rules,
    languageOptions: {
      globals: globals.browser,
    },
  },
  eslintConfigPrettier,
];
