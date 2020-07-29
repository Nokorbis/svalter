'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const patterns = require('./patterns.json');
const buildQuestions = require('./questions.js');
const options = require('./options.js');

function coalesce(option, answer, defaultValue) {
    if (option == null && answer == null) {
        return defaultValue;
    }
    if (typeof option === 'string') {
        option = option.trim();
    }
    if (typeof answer === 'string') {
        answer = answer.trim();
    }
    if (option == null) {
        return answer;
    }
    return option;
}

function adaptNameToPattern(name, patternKey) {
    name = name.toLowerCase();
    if (name.startsWith('[') && name.endsWith(']')) {
        const pattern = patterns.find((p) => p.key === patternKey);
        const regex = pattern ? pattern.regex : null;
        if (regex != null) {
            name = `[${name.substring(1, name.length - 1)}(${regex})]`;
        }
    }

    return name;
}

function formatFolderPath(rootFolder, customFolder, name, pattern) {
    let folder = rootFolder;
    if (customFolder) {
        if (!customFolder.startsWith('/')) {
            folder += '/';
        }
        folder += customFolder.toLowerCase();
    }

    if (!folder.endsWith('/')) {
        folder += '/';
    }
    folder += adaptNameToPattern(name, pattern);

    if (!folder.endsWith('/')) {
        folder += '/';
    }
    return folder;
}

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('routename', {
            desc: 'The name of the route you want to create',
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

    prompting() {
        this.log(yosay(`Welcome to the ${chalk.red('svalter:route')} generator!`));

        const prompts = buildQuestions(this);

        return this.prompt(prompts).then((answers) => {
            this.answers = answers;
        });
    }

    writing() {
        const params = this._getParameters();
        const config = this._getConfiguration();
        const rootFolder = './src/routes';
        const customFolder = params.path;
        const name = params.name;

        let folder = formatFolderPath(rootFolder, customFolder, name);

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

            const path = this.destinationPath(`${folder}${fileName}`);
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
                this.fs.copy(this.templatePath('Component.scss'), path);
            } else {
                path = this.destinationPath(`${folder}/_index.css`);
                this.fs.copy(this.templatePath('Component.css'), path);
            }
            this.createdFiles.push(path);
        }
    }

    _supportsRouting() {
        return 'sapper' === this.config.get('project-type');
    }

    _getParameters() {
        const opts = this.options;
        const answs = this.answers;

        return {
            name: coalesce(opts['routename'], answs['routename'], 'InvalidName'),
            api: coalesce(opts['api'], answs['json-api'], false),
            page: coalesce(opts['page'], answs['page-component'], true),
            path: coalesce(opts['path'], answs['pathprefix'], ''),
            pattern: coalesce(opts['pattern'], answs['pattern'], 'none'),
        };
    }

    _getConfiguration() {
        const preprocessors = this.config.get('support-preprocessors');
        return {
            script_separation: preprocessors.includes('script-separation'),
            style_separation: preprocessors.includes('style-separation'),
            sass: preprocessors.includes('sass'),
            typescript: preprocessors.includes('typescript'),
        };
    }

    install() {}

    end() {
        this.log('Running prettier');
        this.createdFiles.forEach((path) => {
            this.spawnCommandSync('npx', ['prettier', '--write', path, '--loglevel', 'warn']);
        });
    }
};
