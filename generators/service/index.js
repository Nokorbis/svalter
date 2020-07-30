'use strict';

const Generator = require('yeoman-generator');
const buildQuestions = require('./questions.js');
const options = require('./options.js');
const { coalesce, getConfiguration } = require('../../_shared/utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('name', {
            desc: 'The name of the service you want to create',
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
        const rootFolder = './src/scripts/services';
        const customFolder = this._getFolder();
        const name = this._getName();

        let folder = rootFolder;
        if (customFolder) {
            if (!customFolder.startsWith('/')) {
                folder += '/';
            }
            folder += customFolder;
        }

        if (!folder.endsWith('/')) {
            folder += '/';
        }

        const params = {
            ...config,
            service_name: name,
        };

        let path;
        let src;
        if (config.typescript) {
            path = this.destinationPath(`${folder}${name}.ts`);
            src = this.templatePath('service.ts');
        } else {
            src = this.templatePath('service.js');
            path = this.destinationPath(`${folder}${name}.js`);
        }
        this.fs.copyTpl(src, path, params);
        this.createdFiles.push(path);
    }

    install() {}

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

    _getName() {
        return coalesce(this.options.name, this.answers['name'], 'InvalidName');
    }

    end() {
        this.log('Running prettier');
        this.createdFiles.forEach((path) => {
            this.spawnCommandSync('npx', ['prettier', '--write', path, '--loglevel', 'warn']);
        });
    }
};
