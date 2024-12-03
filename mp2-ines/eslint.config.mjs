import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: { ...globals.browser, jest: true } } }, // Adicionando globals para Jest
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      react: pluginReact, // Definindo o plugin React
    },
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React
      },
    },
    rules: {
      "react/no-unescaped-entities": "off", // Desativa a regra de entidades não escapadas
    },
    languageOptions: {
      globals: {
        test: "readonly",  // Adicionando a variável global 'test'
        expect: "readonly", // Adicionando a variável global 'expect'
      },
    },
  },
];
