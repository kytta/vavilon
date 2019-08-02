module.exports = {
    rules: {
        'header-max-length': [2, 'always', 72],

        'type-empty': [2, 'never'],
        'type-case': [2, 'always', 'lower-case'],
        'scope-case': [2, 'always', 'lower-case'],

        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],

        'body-leading-blank': [2, 'always'],

        'footer-leading-blank': [2, 'always'],

        // Перечислим все возможные варианты коммитов
        'type-enum': [
            2,
            'always',
            [
                'chore',
                'docs',
                'feat',
                'fix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test'
            ]
        ]
    }
};
