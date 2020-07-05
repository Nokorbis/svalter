module.exports = [
    {
        name: 'sapper',
        config: {
            desc: 'Create a sapper project',
            type: Boolean,
        },
    },
    {
        name: 'svelte',
        config: {
            desc: 'Create a svelte project',
            type: Boolean,
        },
    },
    {
        name: 'library',
        config: {
            desc: 'Create a component library project',
            type: Boolean,
        },
    },
    {
        name: 'typescript',
        config: {
            desc: 'Adds typescript support to your project',
            type: Boolean,
            alias: 'ts',
        },
    },
    {
        name: 'sass',
        config: {
            desc: 'Adds SASS support to your project',
            type: Boolean,
            alias: 'scss',
        },
    },
    {
        name: 'css-reset',
        config: {
            desc:
                "Defines a css reset to start your project with. Possible values are : 'none', 'meyer_reset', 'normalize', 'sanitize'",
            type: String,
        },
    },
];
