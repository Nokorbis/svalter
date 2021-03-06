'use strict';
const path = require('path');

module.exports = function (generator) {
    return [
        {
            type: 'list',
            name: 'project-type',
            message: 'Type of project?',
            choices: [
                { name: 'Sapper', value: 'sapper' },
                { name: 'Svelte', value: 'svelte' },
                { name: 'Component Library', value: 'library' },
            ],
            default: 1,
            when: function (responses) {
                return (
                    !generator.options.svelte &&
                    !generator.options.sapper &&
                    !generator.options.library
                );
            },
        },
        {
            type: 'input',
            name: 'project-name',
            message: "Project's name: ",
            default: process.cwd().split(path.sep).pop(),
            when: function (responses) {
                if (generator.options.appname == null) {
                    return true;
                }

                generator.options.appname = generator.options.appname.trim();
                return generator.options.appname === '';
            },
        },
        {
            type: 'checkbox',
            name: 'support-preprocessors',
            message: 'Do you want your project to support some preprocessors ?',
            choices: function (answers) {
                const choices = [
                    {
                        name: 'Separates styles from component template',
                        value: 'style-separation',
                    },
                    {
                        name: 'Separates scripts from component template',
                        value: 'script-separation',
                    },
                    { name: 'SASS', value: 'sass' },
                    { name: 'TypeScript', value: 'typescript' },
                ];

                return choices;
            },
            default: function (responses) {
                const opts = generator.options;
                return ['sass', 'typescript', 'style-separation', 'script-separation'].filter(
                    (opt) => opts[opt] === true
                );
            },
            when: function (responses) {
                const opts = generator.options;
                return (
                    opts.typescript == null ||
                    opts.sass == null ||
                    opts['style-separation'] == null ||
                    opts['script-separation'] == null
                );
            },
        },
        {
            type: 'list',
            name: 'css-reset',
            loop: true,
            message: 'Do you want to use a css reset?',
            choices: [
                { name: 'No', value: 'none' },
                { name: 'CSS Reset (by Eric Meyer)', value: 'meyer_reset' },
                { name: 'Normalize (by Necolas)', value: 'normalize' },
                { name: 'Sanitize (by CSS Tools)', value: 'sanitize' },
            ],
            default: 0,
            when: (responses) => {
                if (supportsCssReset(generator, responses)) {
                    return generator.options['css-reset'] == null;
                }
                return false;
            },
        },
    ];
};

function supportsCssReset(generator, responses) {
    return (
        generator.options['sapper'] === true ||
        generator.options['svelte'] === true ||
        'sapper' === responses['project-type'] ||
        'svelte' === responses['project-type']
    );
}
