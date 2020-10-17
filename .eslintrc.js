module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/quotes": [
            "off",
            "single",
            "double"
        ],
        "import/no-extraneous-dependencies": "off",
        "import/no-internal-modules": "off",
        "import/order": "off"
    },
    "extends": ["prettier"]
};
