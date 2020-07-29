'use strict';
module.exports = [
    {
        name: 'path',
        config: {
            desc: 'Path to prefix the route with',
            type: String,
        },
    },
    {
        name: 'pattern',
        config: {
            desc: 'Define a pattern to add to the parameter',
            type: String,
            alias: 'regex',
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
