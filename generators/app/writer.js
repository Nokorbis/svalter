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
        };

        this._copyTemplatedStructure(gen, templateRoot, params);

        const projectType = this._getType(gen);
        const styleType = prepParams.sass ? 'sass' : 'css';
        const scriptType = prepParams.typescript ? 'typescript' : 'javascript';

        this._copyRequiredSpecificity(gen, projectType, styleType);
        this._copyRequiredSpecificity(gen, projectType, scriptType, params);

        if (prepParams.has_preprocessors) {
            this._copyCommonStructure(gen, 'svelte.config.js', prepParams);

            if (prepParams.separation) {
                this._copySeparatedSpecificity(gen, projectType, styleType);
                this._copySeparatedSpecificity(gen, projectType, scriptType);
            }
        }
    }

    _copySeparatedSpecificity(gen, projectType, specType) {
        this._copyStructure(gen, `_specificities/${projectType}/${specType}/separation`);
    }

    _copyRequiredSpecificity(gen, projectType, specType, params = {}) {
        this._copyTemplatedStructure(
            gen,
            `_specificities/${projectType}/${specType}/required`,
            params
        );
    }

    _copyCommonStructure(gen, path, prepParams) {
        this._copyTemplatedStructure(gen, `_common/${path}`, prepParams, `./${path}`);
    }

    _copyStructure(gen, sourcePath, targetPath = '.') {
        const absPath = gen.templatePath(sourcePath);
        if (gen.fs.exists(absPath)) {
            gen.fs.copy(absPath, gen.destinationPath(targetPath));
        }
    }

    _copyTemplatedStructure(gen, sourcePath, params = {}, targetPath = '.') {
        const absPath = gen.templatePath(sourcePath);
        if (gen.fs.exists(absPath)) {
            gen.fs.copyTpl(absPath, gen.destinationPath(targetPath), params);
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
