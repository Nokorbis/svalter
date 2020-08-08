'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');

const patterns = require('./patterns.json');
const { buildDefaultQuestions, buildPathVariablesQuestions } = require('./questions.js');
const options = require('./options.js');
const { coalesce, getConfiguration } = require('../../_shared/utils');

const rootFolder = 'src/routes/';

function isPathVariable(pathPart) {
    return pathPart.startsWith('[') && pathPart.endsWith(']');
}

function extractPathVariableName(pathVariable) {
    return pathVariable.substring(1, pathVariable.length - 1);
}

function hasPattern(pathVariable) {
    const content = extractPathVariableName(pathVariable);
    return content.endsWith(')') && content.includes('(');
}

function hasNoPattern(pathVariable) {
    return !hasPattern(pathVariable);
}

function findMatchingFolder(subfolders, pathVariable) {
    const name = extractPathVariableName(pathVariable);
    for (let i = 0; i < subfolders.length; i++) {
        const folder = subfolders[i];
        if (isPathVariable(folder)) {
            const folderName = extractPathVariableName(folder);
            if (folderName.startsWith(name)) {
                const pattern = folderName.substring(name.length);
                if (pattern.startsWith('(') && pattern.endsWith(')')) {
                    return folder;
                }
            }
        }
    }

    return null;
}

function adaptPathToExitingRoutes(currentPath, pathParts) {
    const actualParts = [];
    let currentExist = true;
    for (let i = 0; i < pathParts.length; i++) {
        let part = pathParts[i];
        if (currentExist) {
            if (fs.existsSync(currentPath)) {
                const subFolders = fs.readdirSync(currentPath);
                if (!subFolders.includes(part)) {
                    if (isPathVariable(part)) {
                        const matchingFolder = findMatchingFolder(subFolders, part);
                        if (matchingFolder == null) {
                            currentExist = false;
                        } else {
                            part = matchingFolder;
                        }
                    }
                }
            }
        }

        actualParts.push(part);
        currentPath += part + '/';
    }

    return actualParts;
}

function getPathVariablesToPattern(pathParts) {
    let currentIndex = 0;

    for (let i = 0; i < pathParts.length; i++) {
        const currentParts = pathParts.slice(0, i + 1);
        const path = rootFolder + currentParts.join('/');
        const pathExists = fs.existsSync(path);
        if (!pathExists) {
            break;
        }
        currentIndex = i + 1;
    }

    return pathParts.slice(currentIndex).filter(isPathVariable).filter(hasNoPattern);
}

function registerPatternOptions(optPatterns, varMatches) {
    if (optPatterns) {
        optPatterns = optPatterns
            .split(';')
            .map((p) => p.trim())
            .filter((p) => p !== '');

        for (let i = 0; i < varMatches.length && i < optPatterns.length; i++) {
            varMatches[i].pattern = optPatterns[i];
        }
    }
}

function extractNameFromParts(pathParts) {
    const index = pathParts.length - 1;
    let last = pathParts[index];
    if (isPathVariable(last)) {
        last = extractPathVariableName(last);
    }
    return last;
}

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('path', {
            desc: 'The path of the route you want to create',
            required: false,
            type: String,
        });

        options.forEach((option) => {
            this.option(option.name, option.config);
        });

        this.createdFiles = [];
    }

    initializing() {
        if (!this._supportsRouting()) {
            this.env.error('Your project does not support routing');
        }

        this.env.adapter.promptModule.registerPrompt(
            'path-completion',
            require('inquirer-autocomplete-prompt')
        );
    }

    async prompting() {
        const prompts = buildDefaultQuestions(this);

        const baseAnswers = await this.prompt(prompts);

        this.params = this._extractBaseParams(baseAnswers);
        let pathParts = this.params.path_parts;
        const pathVariables = getPathVariablesToPattern(pathParts);

        if (pathVariables.length > 0) {
            const varMatches = pathVariables.map((v) => {
                return { key: v, pattern: null };
            });

            let optPatterns = this.options['patterns'];
            registerPatternOptions(optPatterns, varMatches);

            const missingVars = varMatches.filter((m) => m.pattern == null);
            const varQuestions = buildPathVariablesQuestions(
                this,
                missingVars.map((v) => v.key)
            );

            const varAnswers = await this.prompt(varQuestions);

            for (let i = 0; i < missingVars.length; i++) {
                const key = `pattern-${i}`;
                const value = varAnswers[key];
                missingVars[i].pattern = value;
            }

            let j = varMatches.length - 1;
            for (let i = pathParts.length - 1; i >= 0 && j >= 0; i--) {
                const part = pathParts[i];
                if (isPathVariable(part)) {
                    const match = varMatches[j];
                    const patternKey = match.pattern;
                    if (patternKey != null) {
                        let pattern = patterns.find((p) => p.key === patternKey);
                        if (pattern != null) {
                            pattern = pattern.regex;
                            const partName = extractPathVariableName(part);
                            pathParts[i] = `[${partName}(${pattern})]`;
                        }
                    }
                    j--;
                }
            }

            this.params.path_parts = pathParts;
            this.params.path = pathParts.join('/');
        }
    }

    _extractBaseParams(baseAnswers) {
        let path = coalesce(this.options.path, baseAnswers.path, 'InvalidPath');
        let parts = path
            .toLowerCase()
            .split('/')
            .map((p) => p.trim())
            .filter((p) => p !== '');

        if (parts.length > 1) {
            parts = adaptPathToExitingRoutes(rootFolder, parts);
            path = parts.join('/');
        }

        if (fs.existsSync(path)) {
            this.env.error('This route already exists.');
        }

        return {
            path: path,
            path_parts: parts,
            api: coalesce(this.options['json-api'], baseAnswers['json-api'], false),
            page: coalesce(this.options['page-component'], baseAnswers['page-component'], true),
        };
    }

    writing() {
        const params = this.params;
        const folder = rootFolder + this.params.path;
        const config = this._getConfiguration();
        const name = extractNameFromParts(params.path_parts);

        if (params.page) {
            this._addScript(config, folder);
            this._addStyle(config, folder);

            const path = this.destinationPath(`${folder}/index.svelte`);
            this.fs.copyTpl(this.templatePath('route.svelte'), path, {
                ...config,
                routename: name,
            });

            this.createdFiles.push(path);
        }

        if (params.api) {
            const fileName = `index.json.${config.typescript ? 'ts' : 'js'}`;

            const path = this.destinationPath(`${folder}/${fileName}`);
            this.fs.copyTpl(this.templatePath(fileName), path, {
                ...config,
                routename: name,
            });

            this.createdFiles.push(path);
        }
    }

    _addScript(config, folder) {
        if (config.script_separation) {
            let path;
            if (config.typescript) {
                path = this.destinationPath(`${folder}/_index.ts`);
                this.fs.copy(this.templatePath('route.ts'), path);
            } else {
                path = this.destinationPath(`${folder}/_index.js`);
                this.fs.copy(this.templatePath('route.js'), path);
            }
            this.createdFiles.push(path);
        }
    }

    _addStyle(config, folder) {
        if (config.style_separation) {
            let path;
            if (config.sass) {
                path = this.destinationPath(`${folder}/_index.scss`);
                this.fs.copy(this.templatePath('route.scss'), path);
            } else {
                path = this.destinationPath(`${folder}/_index.css`);
                this.fs.copy(this.templatePath('route.css'), path);
            }
            this.createdFiles.push(path);
        }
    }

    _supportsRouting() {
        return 'sapper' === this.config.get('project-type');
    }

    _getConfiguration() {
        return getConfiguration(this);
    }

    install() {}

    end() {
        this.log('Running prettier');
        this.createdFiles.forEach((path) => {
            this.spawnCommandSync('npx', ['prettier', '--write', path, '--loglevel', 'warn']);
        });
    }
};
