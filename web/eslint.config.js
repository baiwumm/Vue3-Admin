import { defineConfig } from "@soybeanjs/eslint-config";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig(
  { vue: true, unocss: true },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "vue/multi-word-component-names": [
        "warn",
        {
          ignores: ["index", "App", "Register", "[id]", "[url]"],
        },
      ],
      "vue/component-name-in-template-casing": [
        "warn",
        "PascalCase",
        {
          registeredComponentsOnly: false,
          ignores: ["/^icon-/"],
        },
      ],
      "unocss/order-attributify": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
);
