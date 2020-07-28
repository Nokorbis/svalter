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
];
