'use strict';
const Generator = require('yeoman-generator');

const buildQuestions = require('./questions.js');
const options = require('./options.js');
const Configurator = require('./configurator.js');
const writer = new (require('./writer.js'))();
const installer = new (require('./installer.js'))();

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', {
            desc: 'The name of what you are trying to create',
            required: false,
            type: String,
        });

        options.forEach((option) => {
            this.option(option.name, option.config);
        });
    }

    prompting() {
        const prompts = buildQuestions(this);

        return this.prompt(prompts).then((props) => {
            this.answers = props;
        });
    }

    configuring() {
        const configurator = new Configurator();
        configurator.saveConfigurationsFromInputs(this);
    }

    writing() {
        writer.write(this);
    }

    install() {
        installer.install(this);
    }

    end() {
        this.log('Running prettier to clean files');
        this.spawnCommandSync('npx', ['prettier', '--write', '.', '--loglevel', 'warn']);
    }
};
