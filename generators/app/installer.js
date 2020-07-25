'use strict';

module.exports = class Installer {
    install(generator) {
        generator.npmInstall(['prettier', 'prettier-plugin-svelte'], { 'save-dev': true });
        generator.installDependencies({ npm: true, bower: false, yarn: false });
        generator.spawnCommandSync('npx', ['prettier', '--write', '.']);
    }
};
