'use strict';
const projectStructure = require('./project_structures.js');
const normalizer = new (require('./normalizer.js'))();

const fs = require('fs');

module.exports = class Writer {
    write(gen) {
        this._writeProjectStructure(gen);
        this._writeCssReset(gen);
        this._writePrettierConfig(gen);
        this._updatePackage(gen);
    }

    _writePrettierConfig(gen) {
        gen.fs.copy(
            gen.templatePath('_common/prettier/.prettierrc.json'),
            gen.destinationPath('./.prettierrc.json')
        );
        gen.fs.copy(
            gen.templatePath('_common/prettier/.prettierignore'),
            gen.destinationPath('./.prettierignore')
        );
    }

    _writeProjectStructure(gen) {
        const templateRoot = this._getProjectTemplateRoot(gen);

        const config = gen.config;

        const prepParams = this._getPreprocessorsParameters(config);
        const params = {
            project_name: config.get('project-name'),
            package_name: normalizer.normalizePackageName(config.get('project-name')),
            css_reset: config.get('css-reset'),
            paths: {
                partials: {
                    styles: gen.templatePath('_partials/styles_tag.ejs'),
                    scripts: gen.templatePath('_partials/scripts_tag.ejs'),
                },
                specs: gen.templatePath(`_specificities/${templateRoot}`),
            },
            ...prepParams,
        };

        this._copyTemplatedStructure(gen, templateRoot, params);

        const projectType = this._getType(gen);
        const styleType = prepParams.sass ? 'sass' : 'css';
        const scriptType = prepParams.typescript ? 'typescript' : 'javascript';

        this._copyRequiredSpecificity(gen, projectType, styleType);
        this._copyRequiredSpecificity(gen, projectType, scriptType, params);

        if (prepParams.has_preprocessors) {
            this._copyCommonStructure(
                gen,
                'svelte.config.js',
                prepParams,
                this._getConfigRoot(gen)
            );

            if (prepParams.style_separation) {
                this._copySeparatedSpecificity(gen, projectType, styleType);
            }
            if (prepParams.script_separation) {
                this._copySeparatedSpecificity(gen, projectType, scriptType);
            }
        }
    }

    _copySeparatedSpecificity(gen, projectType, specType) {
        this._copyStructure(gen, `_specificities/${projectType}/${specType}/separation/`);
    }

    _copyRequiredSpecificity(gen, projectType, specType, params = {}) {
        this._copyTemplatedStructure(
            gen,
            `_specificities/${projectType}/${specType}/required/`,
            params
        );
    }

    _copyCommonStructure(gen, path, prepParams, targetFolder = '.') {
        this._copyTemplatedStructure(gen, `_common/${path}`, prepParams, `${targetFolder}/${path}`);
    }

    _copyStructure(gen, sourcePath, targetPath = '.') {
        const absPath = gen.templatePath(sourcePath);
        if (fs.existsSync(absPath)) {
            gen.fs.copy(absPath, gen.destinationPath(targetPath));
        }
    }

    _copyTemplatedStructure(gen, sourcePath, params = {}, targetPath = '.') {
        const absPath = gen.templatePath(sourcePath);

        if (fs.existsSync(absPath)) {
            gen.fs.copyTpl(absPath, gen.destinationPath(targetPath), params);
        }
    }

    _getPreprocessorsParameters(config) {
        const preprocessors = config.get('support-preprocessors');
        return {
            project_type: config.get('project-type'),
            preprocessors: preprocessors,
            has_preprocessors: preprocessors.length > 0,
            sass: preprocessors.includes('sass'),
            typescript: preprocessors.includes('typescript'),
            style_separation: preprocessors.includes('style-separation'),
            script_separation: preprocessors.includes('script-separation'),
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

    _getConfigRoot(generator) {
        const type = this._getType(generator);
        return projectStructure[type].config_root;
    }

    _getStylesFolder(generator) {
        const staticFolder = this._getStaticFolder(generator);
        return `${staticFolder}/styles`;
    }

    _updatePackage(generator) {
        const prepParams = this._getPreprocessorsParameters(generator.config);
        const file =
            'library' === prepParams.project_type ? 'examples/package.json' : 'package.json';
        const pkg = { scripts: {}, devDependencies: {}, dependencies: {} };

        if (prepParams.has_preprocessors) {
            pkg.devDependencies['svelte-preprocess'] = '4.3.0';

            if (prepParams.sass) {
                pkg.devDependencies['sass'] = '^1.26.11';
                pkg.devDependencies['postcss'] = '^8.0.5';
            }

            if (prepParams.typescript) {
                pkg.scripts['validate'] = 'svelte-check';
                pkg.devDependencies['typescript'] = '^4.0.3';
                pkg.devDependencies['@rollup/plugin-typescript'] = '^6.0.0';
                pkg.devDependencies['svelte-check'] = '^1.0.44';
                pkg.devDependencies['tslib'] = '^2.0.1';
                pkg.devDependencies['@tsconfig/svelte'] = '^1.0.10';

                if ('sapper' === prepParams.project_type) {
                  pkg.devDependencies['@types/polka'] = '^0.5.2';
                  pkg.devDependencies['@types/compression'] = '^1.7.4';
                }
            }
        }

        generator.fs.extendJSON(generator.destinationPath(file), pkg);
    }
};
