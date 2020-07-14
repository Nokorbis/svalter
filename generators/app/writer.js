'use strict';
const projectStructure = require('./project_structures.js');
const normalizer = new (require('./normalizer.js'))();

module.exports = class Writer {
    write(gen) {
        this._writeProjectStructure(gen);
        this._writeCssReset(gen);
    }

    _writeProjectStructure(gen) {
        const templateRoot = this._getProjectTemplateRoot(gen);

        const config = gen.config;
        const preprocessors = config.get('support-preprocessors');

        gen.fs.copyTpl(gen.templatePath(templateRoot), gen.destinationPath('.'), {
            project_name: config.get('project-name'),
            package_name: normalizer.normalizePackageName(config.get('project-name')),
            css_reset: config.get('css-reset'),
            support_preprocessors: preprocessors,
        });

        if (preprocessors.length > 0) {
            gen.fs.copyTpl(gen.templatePath('common/svelte.config.js'), gen.destinationPath('./svelte.config.js'), {
              support_preprocessors: preprocessors,
            });

            if (preprocessors.includes('sass')) {
              gen.fs.copy(gen.templatePath('common/assets'), gen.destinationPath('./src/assets'));
            }
        }
    }

    _writeCssReset(gen) {
        const cReset = gen.config.get('css-reset');
        if (cReset !== 'none') {
            const resetFile = `${cReset}.css`;
            const stylesFolder = this._getStylesFolder(gen);
            gen.fs.copy(
                gen.templatePath(`common/css/${resetFile}`),
                gen.destinationPath(`${stylesFolder}/${resetFile}`)
            );
        }
    }

    _getType(generator) {
        return generator.config.get('project-type');
    }

    _getProjectTemplateRoot(generator) {
        const type = this._getType(generator);
        return projectStructure[type].template_root;
    }

    _getStaticFolder(generator) {
        const type = this._getType(generator);
        return projectStructure[type].static_dir;
    }

    _getStylesFolder(generator) {
        const staticFolder = this._getStaticFolder(generator);
        return `${staticFolder}/styles`;
    }
};
