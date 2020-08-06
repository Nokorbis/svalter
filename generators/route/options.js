'use strict';
module.exports = [
    {
        name: 'patterns',
        config: {
            desc: 'Defines patterns for path variables (separated by ; )',
            type: String,
        },
    },
    {
        name: 'json-api',
        config: {
            alias: 'api',
            type: Boolean,
            desc: 'Creates a json API file in that route',
        },
    },
    {
        name: 'page-component',
        config: {
            alias: 'page',
            type: Boolean,
            desc: 'Creates a page component file in that route',
        },
    },
];
