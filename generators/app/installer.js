'use strict';

module.exports = class Installer {
    install(generator) {
        const type = generator.config.get('project-type');
        generator.installDependencies({ npm: true, bower: false, yarn: false });
        /*if ('library' === type) {
            generator.spawnCommand('npm', ['link'])
        }*/
    }
};
