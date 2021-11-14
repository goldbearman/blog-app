module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {

      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    indent: ['error', 2, { SwitchCase: 1 }],
    // indent: ['error', 2, { ignoredNodes: ['JSXElement'] }],
    'no-plusplus': 'off',
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': [2, {
      labelComponents: ['CustomInputLabel'],
      labelAttributes: ['label'],
      controlComponents: ['CustomInput'],
      depth: 3,
    }],
    'jsx-a11y/img-redundant-alt': [2, {
      components: ['Image'],
      words: ['Bild', 'Foto'],
    }],
    'jsx-a11y/alt-text': [0],
  },
};
