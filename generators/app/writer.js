'use strict';
const projectStructure = require('./project_structures.js');
const normalizer = new (require('./normalizer.js'))();
const gulpif = require('gulp-if');
const beautify = require('gulp-beautify').js;
const beautify_css = require('gulp-beautify').css;
const beautify_html = require('gulp-beautify').html;
// https://github.com/tarunc/gulp-jsbeautifier
// https://github.com/beautify-web/js-beautify
const fs = require('fs');

function isJS(file) {
    return ['.ts', '.js', '.json'].includes(file.extname);
}

function isStyle(file) {
    return ['.css', '.scss'].includes(file.extname);
}

function isMarkup(file) {
    return ['.html', '.svelte'].includes(file.extname);
}

module.exports = class Writer {
    write(gen) {
        gen.registerTransformStream(
            gulpif(isJS, beautify({ indent_size: 4, max_preserve_newlines: 2, wrap_line_length: 100 }))
        );
        gen.registerTransformStream(
            gulpif(isStyle, beautify_css({ indent_size: 4, max_preserve_newlines: 1 }))
        );
        gen.registerTransformStream(
            gulpif(
                isMarkup,
                beautify_html({ indent_size: 4, max_preserve_newlines: 1, js: { indent_size: 2, wrap_line_length: 100 } })
            )
        );
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

            if (prepParams.separation) {
                this._copySeparatedSpecificity(gen, projectType, styleType);
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

    _getConfigRoot(generator) {
        const type = this._getType(generator);
        return projectStructure[type].config_root;
    }

    _getStylesFolder(generator) {
        const staticFolder = this._getStaticFolder(generator);
        return `${staticFolder}/styles`;
    }
};
