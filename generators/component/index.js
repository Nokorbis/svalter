'use strict';

const Generator = require('yeoman-generator');
const buildQuestions = require('./questions.js');
const options = require('./options.js');
const { coalesce, getConfiguration } = require('../../_shared/utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('componentname', {
            desc: 'The name of the component you want to create',
            required: false,
            type: String,
        });

        options.forEach((option) => {
            this.option(option.name, option.config);
        });

        this.createdFiles = [];
    }

    prompting() {
        const prompts = buildQuestions(this);

        return this.prompt(prompts).then((props) => {
            this.answers = props;
        });
    }

    writing() {
        const config = this._getConfiguration();
        const rootFolder = './src/components';
        const customFolder = this._getFolder();
        const name = this._getComponentName();

        let folder = rootFolder;
        if (customFolder) {
            if (!customFolder.startsWith('/')) {
                folder += '/';
            }
            folder += customFolder;
        }

        if (config.style_separation || config.script_separation) {
            if (!folder.endsWith('/')) {
                folder += '/';
            }
            folder += name;

            if (config.script_separation) {
                let path;
                if (config.typescript) {
                    path = this.destinationPath(`${folder}/_${name}.ts`);
                    this.fs.copy(this.templatePath('Component.ts'), path);
                } else {
                    path = this.destinationPath(`${folder}/_${name}.js`);
                    this.fs.copy(this.templatePath('Component.js'), path);
                }
                this.createdFiles.push(path);
            }

            if (config.style_separation) {
                let path;
                if (config.sass) {
                    path = this.destinationPath(`${folder}/_${name}.scss`);
                    this.fs.copy(this.templatePath('Component.scss'), path);
                } else {
                    path = this.destinationPath(`${folder}/_${name}.css`);
                    this.fs.copy(this.templatePath('Component.css'), path);
                }
                this.createdFiles.push(path);
            }
        }

        if (!folder.endsWith('/')) {
            folder += '/';
        }

        const path = this.destinationPath(`${folder}${name}.svelte`);

        this.fs.copyTpl(this.templatePath('Component.svelte'), path, {
            ...config,
            componentname: name,
        });

        this.createdFiles.push(path);
    }

    _getConfiguration() {
        return getConfiguration(this);
    }

    _getFolder() {
        let folder = coalesce(this.options.folder, this.answers['folder'], '');
        if (folder.endsWith('/')) {
            folder = folder.substr(0, folder.length - 1);
        }
        return folder;
    }

    _getComponentName() {
        return coalesce(this.options.componentname, this.answers['component-name'], 'InvalidName');
    }

    install() {}

    end() {
        this.log('Running prettier');
        this.createdFiles.forEach((path) => {
            this.spawnCommandSync('npx', ['prettier', '--write', path, '--loglevel', 'warn']);
        });
    }
};
