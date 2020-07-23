'use strict';
const path = require('path');

module.exports = function(generator) {
    return [
        {
            type: 'input',
            name: 'component-name',
            message: "Component's name: ",
            when: function(responses) {
                if (generator.options.componentname == null) {
                    return true;
                }

                generator.options.componentname = generator.options.componentname.trim();
                return generator.options.componentname === '';
            },
        },
        {
            type: 'input',
            name: 'folder',
            message: "Do you want to put the component in a specific folder ? (leave empty for none) ",
            when: function(responses) {
                if (generator.options.folder == null) {
                    return true;
                }
                return false;
            },
        },
    ];
};

