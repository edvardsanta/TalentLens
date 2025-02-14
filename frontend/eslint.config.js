import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import jsdoc from "eslint-plugin-jsdoc";

/** @type {import('eslint').Linter.Config[]} */
export default [
  jsdoc.configs["flat/recommended"],
  { files: ["**/*.{js,mjs,cjs,jsx}"], ignores: ["**/*.cy.{js,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": ["off"],
      "no-console": "error",
    },
  },
];
