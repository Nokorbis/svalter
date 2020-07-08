'use strict';

module.exports = class Installer {
    install(generator) {
        const type = generator.config.get('project-type');
        //generator.installDependencies({ npm: true, bower: false, yarn: false });

        const preProcs = generator.config.get('support-preprocessors');

        if (preProcs.length > 0) {
            const ts = preProcs.includes('typescript');
            const sass = preProcs.includes('sass');

            generator.npmInstall('svelte-preprocess', {'save-dev': true});
            if (ts) {
                generator.npmInstall('typescript', {'save-dev': true});
            }
            if (sass) {
                generator.npmInstall('node-sass', {'save-dev': true});
            }
        }
    }
};
