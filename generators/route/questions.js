'use strict';
const chalk = require('chalk');
const path = require('path');

const patterns = require('./patterns.json');

module.exports = function (generator) {
    return [
        {
            prefix: `${chalk.rgb(250, 110, 5)('Route |')}`,
            type: 'input',
            name: 'routename',
            message: "Route's name: ",
            when: function (responses) {
                if (generator.options.routename == null) {
                    return true;
                }

                generator.options.routename = generator.options.routename.trim();
                return generator.options.routename === '';
            },
            validate: function (input) {
                if (input == null) {
                    return false;
                }

                input = input.trim();
                if (input === '') {
                    return 'You cannot enter an empty string';
                }

                return true;
            },
        },
        {
            prefix: `${chalk.rgb(250, 110, 5)('Route |')}`,
            type: 'list',
            name: 'pattern',
            message: 'Do you want to use a predefined pattern in your route?',
            choices: patterns.map(p => { return {name: p.display, value: p.key}}),
            default: 'none',
            when: function (responses) {
                const name = responses['routename'];
                return name.startsWith('[') && name.endsWith(']');
            },
        },
        {
            prefix: `${chalk.rgb(250, 110, 5)('Route |')}`,
            type: 'input',
            name: 'pathprefix',
            message: 'Do you want to prefix the route with a path? (leave empty for none)',
            when: function (responses) {
                if (generator.options.path == null) {
                    return true;
                }
                return false;
            },
        },
        {
            prefix: `${chalk.rgb(250, 110, 5)('Features |')}`,
            type: 'confirm',
            name: 'page-component',
            message: 'Do you want to generate a page svelte component ?',
            default: true,
        },
        {
            prefix: `${chalk.rgb(250, 110, 5)('Features |')}`,
            type: 'confirm',
            name: 'json-api',
            message: 'Do you want to generate a json api ?',
            default: false,
        },
    ];
};
