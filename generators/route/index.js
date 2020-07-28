'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const patterns = require('./patterns.json');
const buildQuestions = require('./questions.js');
const options = require('./options.js');

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

        this.env.adapter.promptModule.registerPrompt('path-completion', require('inquirer-autocomplete-prompt'));
    }

    prompting() {
        this.log(yosay(`Welcome to the ${chalk.red('svalter:route')} generator!`));

        const prompts = buildQuestions(this);

        return this.prompt(prompts).then((answers) => {
            this.answers = answers;
        });
    }

    writing() {
        //this.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
    }

    _supportsRouting() {
        return 'sapper' === this.config.get('project-type');
    }

    install() {}

    end() {
        this.log('Running prettier');
        this.createdFiles.forEach((path) => {
            this.spawnCommandSync('npx', ['prettier', '--write', path, '--loglevel', 'warn']);
        });
    }
};
