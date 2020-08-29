module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "react-hooks", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },

      // https://github.com/benmosher/eslint-plugin-import/issues/1485
      typescript: {},
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-console": "off",
    "prettier/prettier": ["error", { semi: false }],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],

    // https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
    "import/extensions": [
      "error",
      "ignorePackages",
      { ts: "never", tsx: "never" },
    ],

    // switch 内での列挙漏れチェック
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "default-case": "off",

    // export default は基本使わないとする
    // pages ディレクトリ下では限定的に許可して対応してる
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
  },
}
