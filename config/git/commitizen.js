module.exports = {
    types: [
        {
            value: 'chore',
            name: 'chore:    Change to tools and libraries, such as dependencies updates, package.json fixes, version bumps'
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
            name: 'test:     Change to testing (new tests or environments)'
        }
    ],

    scopes: [
        {
            value: 'core',
            name: 'core:         Change to the main logic of the lib'
        },
        {
            value: 'dictionaries',
            name: 'dictionaries: Change to the dictionaries (registering, loading, management)'
        },
        {
            value: 'locales',
            name: 'locales:      Change to the locales (encoding, transforming, checking)'
        },
        {
            value: 'elements',
            name: 'elements:     Change to the elements (parsing, replacing)'
        }
    ],

    scopeOverrides: {
        'chore': [
            {
                value: 'build',
                name: 'build:   Change to build config'
            },
            {
                value: 'dep',
                name: 'dep:     Add, update or remove dependencies'
            },
            {
                value: 'lint',
                name: 'lint:    Change to lint config'
            },
            {
                value: 'version',
                name: 'version: Update the version number'
            },
        ],
        'docs': [
            {
                value: 'changelog',
                name: 'changelog: Change or fix in CHANGELOG'
            },
            {
                value: 'contrib',
                name: 'contrib:   Change or fix in CONTRIBUTING guildelines'
            },
            {
                value: 'license',
                name: 'license:   Change or fix in LICENSE'
            },
            {
                value: 'readme',
                name: 'readme:    Change or fix in README'
            },
        ],
        'style': [],
        'test': [
            {
                value: 'unit',
                name: 'unit: Change to unit tests'
            },
            {
                value: 'e2e',
                name: 'e2e:  Change to e2e (integration) tests'
            }
        ]
    },

    messages: {
        type: 'What kind of changes are you committing?         ',
        scope: 'What scope is the change related to?            ',
        customScope: 'Enter the name of a custom scope:         ',
        subject: 'Describe the change shortly and imperatively: ',
        body: 'Add detailed description. Use "|" for newlines:  ',
        breaking: 'Describe any breaking changes:               ',
        footer: 'Add metadata such as links or issue numbers:   ',

        confirmCommit: 'Does the commit look good? '
    },

    allowCustomScopes: true,

    footerPrefix: 'META:',

    subjectLimit: 72
};
