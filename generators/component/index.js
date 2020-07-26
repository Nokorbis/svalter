'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const buildQuestions = require('./questions.js');
const options = require('./options.js');

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
        // Have Yeoman greet the user.
        this.log(yosay(`Welcome to the ${chalk.red('svalter:component')} generator!`));

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
        const preprocessors = this.config.get('support-preprocessors');
        return {
            script_separation: preprocessors.includes('script-separation'),
            style_separation: preprocessors.includes('style-separation'),
            sass: preprocessors.includes('sass'),
            typescript: preprocessors.includes('typescript'),
        };
    }

    _getFolder() {
        if (this.options.folder) {
            this.options.folder = this.options.folder.trim();
            if (this.options.folder !== '') {
                return this.options.folder;
            }
        }

        let folder = this.answers['folder'].trim();

        if (folder.endsWith('/')) {
            folder = folder.substr(0, folder.length - 1);
        }

        this.answers['folder'] = folder;
        return folder;
    }

    _getComponentName() {
        if (this.options.componentname) {
            this.options.componentname = this.options.componentname.trim();
            if (this.options.componentname !== '') {
                return this.options.componentname;
            }
        }

        let name = this.answers['component-name'];
        name = name.trim();

        return name;
    }

    install() {}

    end() {
        this.log('Running prettier');
        this.createdFiles.forEach((path) => {
            this.spawnCommandSync('npx', ['prettier', '--write', path, '--loglevel', 'warn']);
        });
    }
};
