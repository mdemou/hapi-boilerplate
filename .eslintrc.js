module.exports = {
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "env": {
        "es6": true,
        "node": true,
        "jest/globals": true
    },
    "plugins": [
        "jest"
    ],
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};