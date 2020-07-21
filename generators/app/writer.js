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

        const prepParams = this._getPreprocessorsParameters(config);
        const params = {
          project_name: config.get('project-name'),
          package_name: normalizer.normalizePackageName(config.get('project-name')),
          css_reset: config.get('css-reset'),
          ...prepParams,
        }
        gen.fs.copyTpl(gen.templatePath(templateRoot), gen.destinationPath('.'), params);

        if (prepParams.has_preprocessors) {
            gen.fs.copyTpl(
                gen.templatePath('_common/svelte.config.js'),
                gen.destinationPath('./svelte.config.js'),
                {
                    ...prepParams,
                }
            );

            const projectType = this._getType(gen);
            const styleType = prepParams.sass ? 'sass' : 'css';
            const scriptType = prepParams.typescript ? 'typescript' : 'javascript';

            gen.fs.copy(
                gen.templatePath(`_specificities/${projectType}/${styleType}/required`),
                gen.destinationPath('.')
            );

            gen.fs.copyTpl(
                gen.templatePath(`_specificities/${projectType}/${scriptType}/required`),
                gen.destinationPath('.'),
                params
            );

            if (prepParams.separation) {
                gen.fs.copy(
                    gen.templatePath(`_specificities/${projectType}/${styleType}/separation`),
                    gen.destinationPath('.')
                );

                gen.fs.copy(
                    gen.templatePath(`_specificities/${projectType}/${scriptType}/separation`),
                    gen.destinationPath('.')
                );
            }
        }
    }

    _getPreprocessorsParameters(config) {
        const preprocessors = config.get('support-preprocessors');
        return {
            preprocessors: preprocessors,
            has_preprocessors: preprocessors.length > 0,
            sass: preprocessors.includes('sass'),
            typescript: preprocessors.includes('typescript'),
            separation: preprocessors.includes('separation'),
        };
    }

    _writeCssReset(gen) {
        const cReset = gen.config.get('css-reset');
        if (cReset !== 'none') {
            const resetFile = `${cReset}.css`;
            const stylesFolder = this._getStylesFolder(gen);
            gen.fs.copy(
                gen.templatePath(`_common/css/${resetFile}`),
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
