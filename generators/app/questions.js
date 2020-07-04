const path = require('path');

module.exports = function(generator) {
    return [
        {
            type: 'list',
            name: 'project-type',
            message: 'Type of project?',
            choices: ['sapper', 'svelte', 'library'],
            default: 1,
            when: function(responses) {
                return !generator.options.svelte && !gen.options.sapper && !gen.options.library;
            },
        },
        {
            type: 'input',
            name: 'project-name',
            message: "Project's name: ",
            default: process
                .cwd()
                .split(path.sep)
                .pop(),
            when: function(responses) {
                if (generator.options.appname == null) {
                    return true;
                }
                generator.options.appname = generator.options.appname.trim();
                return '' === generator.options.appname;
            },
        },
        {
            type: 'confirm',
            name: 'support-typescript',
            message: 'Do you want your project to support TypeScript?',
            default: false,
            when: function(responses) {
                return generator.options.typescript == null;
            },
        },
        {
            type: 'confirm',
            name: 'support-sass',
            message: 'Do you want your project to support SASS?',
            default: false,
            when: function(responses) {
                return generator.options.sass == null;
            },
        },
    ];
};
