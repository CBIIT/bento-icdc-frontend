import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierConfig from 'eslint-config-prettier';


export default tseslint.config(
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      ignores: ['webpack/**', '**/src/serviceWorker.js', 'config/**/**', '**/postcss.config.js', 'scripts/**/**'],
      languageOptions: {
        globals: globals.browser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
          ecmaVersion: "latest",
          ecmaFeatures: {
            jsx: true
          },
        },
      },
      rules: {
        'react/prop-types': 'off',
        "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error", // or "error"
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ]
      },
      plugins: {
        react: pluginReact
      },
      extends: [
        pluginJs.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
        pluginReact.configs.flat.recommended,
        prettierConfig,
      ]
    },
    {
      files: ["**/*.{js,jsx}"],
      ...tseslint.configs.disableTypeChecked,
    },
  );