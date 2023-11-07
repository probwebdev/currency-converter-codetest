module.exports = {
  extends: ['@acme/eslint-config'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 0,
  },
};
