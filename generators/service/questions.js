'use strict';
const path = require('path');

module.exports = function (generator) {
    return [
        {
            type: 'input',
            name: 'name',
            message: "Service's name: ",
            when: function (responses) {
                if (generator.options.name == null) {
                    return true;
                }

                generator.options.name = generator.options.name.trim();
                return generator.options.name === '';
            },
        },
        {
            type: 'input',
            name: 'folder',
            message:
                'Do you want to put the service in a specific folder ? (leave empty for none) ',
            when: function (responses) {
                if (generator.options.folder == null) {
                    return true;
                }
                return false;
            },
        },
    ];
};
