import globals from "globals";
import tseslint from "typescript-eslint";
import { fixupPluginRules } from "@eslint/compat";
// PLUGINS
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginNext from "@next/eslint-plugin-next";

export default [
  // Ignores configuration
  {
    ignores: ["node_modules", ".next", ".vscode", "**/public", "**/*.html", "**/*.config.js"],
  },
  // General configuration
  {
    rules: {
      "object-shorthand": "error",
      "linebreak-style": "off",
      "prefer-const": "warn",
      "no-dupe-keys": "warn",
      "array-callback-return": "warn",
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
    },
  },
  // React configuration
  {
    plugins: {
      react: fixupPluginRules(eslintPluginReact),
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
      "jsx-a11y": fixupPluginRules(eslintPluginJsxA11y),
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unknown-property": [
        "warn",
        {
          ignore: ["css"],
        },
      ],
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
    },
  },
  // TypeScript configuration
  ...[
    ...tseslint.configs.recommended,
    {
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-shadow": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            args: "after-used",
            ignoreRestSiblings: false,
            argsIgnorePattern: "^_.*?$",
          },
        ],
      },
    },
  ],
  // Prettier configuration
  ...[
    eslintPluginPrettier,
    {
      rules: {
        "prettier/prettier": [
          "warn",
          {
            printWidth: 110,
            trailingComma: "all",
            tabWidth: 2,
            semi: true,
            singleQuote: false,
            arrowParens: "always",
            endOfLine: "auto",
            plugins: ["prettier-plugin-tailwindcss"],
          },
        ],
      },
    },
  ],
  // Import configuration
  {
    plugins: {
      import: fixupPluginRules(eslintPluginImport),
    },
    rules: {
      "import/no-named-as-default": "off",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    },
  },
  // Next configuration
  {
    plugins: {
      next: fixupPluginRules(eslintPluginNext),
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];
