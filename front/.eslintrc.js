module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'no-console': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/no-unresolved': 'off',
        'dot-notation': 'off'
    }
};
