module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  rules: {
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "import/order": "off",
    "prefer-destructuring": "off"
  },
  env: { browser: true }
};
