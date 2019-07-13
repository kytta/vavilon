module.exports = {
    types: [
        {
            value: 'build',
            name: 'build:    Project or dependency build setup'
        },
        {
            value: 'docs',
            name: 'docs:     Documentation update'
        },
        {
            value: 'feat',
            name: 'feat:     New feature'
        },
        {
            value: 'fix',
            name: 'fix:      Error/bug fix'
        },
        {
            value: 'perf',
            name: 'perf:     Performance-related change'
        },
        {
            value: 'refactor',
            name: 'refactor: Change that doesn\'t add new features nor fixes bugs'
        },
        {
            value: 'revert',
            name: 'revert:   Revert to a previous commit'
        },
        {
            value: 'style',
            name: 'style:    Style-related change (tabs, spaces, punctuation, etc.)'
        },
        {
            value: 'test',
            name: 'test:     New or updated test'
        }
    ],

    scopes: [
        { name: 'core' },
        { name: 'types' },
        { name: 'dictionaries' },
        { name: 'locales' }
    ],

    messages: {
        type: 'What kind of changes are you committing?',
        scope: 'What scope is the change related to? (optional)',
        customScope: 'Enter the name of a custom scope',
        subject: 'Describe the change in a short, imperative sentence',
        body: 'Add detailed description (optional). Use "|" for newlines',
        breaking: 'If there are any breaking changes, describe them (optional)',
        footer: 'Add metadata such as links or issue numbers (optional)',
        confirmCommit: 'Does the commit look good?'
    },

    allowCustomScopes: true,

    footerPrefix: 'META:',

    subjectLimit: 72
};
