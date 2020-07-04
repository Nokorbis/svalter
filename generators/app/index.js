'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const buildQuestions = require('./questions.js');
const options = require('./options.js');
const Configurator = require('./configurator.js');

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
        // Have Yeoman greet the user.
        this.log(yosay(`Welcome to the ${chalk.rgb(235, 110, 50).bold('Svalter')} generator!`));

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
        this.log(this.config.get('project-name'));
        /*this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );*/
    }

    install() {
        //this.installDependencies();
    }
};
