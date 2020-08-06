'use strict';

const patterns = require('./patterns.json');

module.exports = {
    buildDefaultQuestions: function (generator) {
        return [
            {
                type: 'input',
                name: 'path',
                message: "Route's path: ",
                when: function () {
                    if (generator.options.path == null) {
                        return true;
                    }

                    generator.options.path = generator.options.path.trim();
                    return generator.options.path === '';
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
                type: 'confirm',
                name: 'page-component',
                message: 'Do you want to generate a page svelte component ?',
                default: true,
            },
            {
                type: 'confirm',
                name: 'json-api',
                message: 'Do you want to generate a json api ?',
                default: false,
            },
        ];
    },

    /**
     *
     * @param {Generator}generator
     * @param {string[]} pathVariables
     */
    buildPathVariablesQuestions: function (generator, pathVariables) {
        const patternsQuestions = [];
        let i = 0;
        pathVariables.forEach((variable) => {
            patternsQuestions.push({
                ...patternQuestionTemplate,
                name: `pattern-${i++}`,
                message: `Do you want to use a pattern for your variable "${variable}" ?`,
            });
        });
        return patternsQuestions;
    },
};

const patternQuestionTemplate = {
    type: 'list',
    name: 'pattern',
    message: 'Do you want to use a predefined pattern in your route?',
    choices: patterns.map((p) => {
        return { name: p.display, value: p.key };
    }),
    default: 'none',
};
