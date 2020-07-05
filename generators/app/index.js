'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const buildQuestions = require('./questions.js');
const options = require('./options.js');
const Configurator = require('./configurator.js');
const normalizer = new (require('./normalizer.js'))();

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
        const templateRoot = this._getProjectTemplateRoot(this);

        this.fs.copyTpl(this.templatePath(templateRoot), this.destinationPath('.'), {
            project_name: this.config.get('project-name'),
            package_name: normalizer.normalizePackageName(this.config.get('project-name')),
            css_reset: this.config.get('css-reset'),
        });

        const cReset = this.config.get('css-reset');
        if (cReset !== 'none') {
            const resetFile = `${cReset}.css`;
            this.fs.copy(
                this.templatePath(`common/${resetFile}`),
                this.destinationPath(`public/styles/${resetFile}`)
            );
        }
    }

    _getProjectTemplateRoot(generator) {
        return generator.config.get('project-type');
    }

    install() {
        // This.installDependencies({ npm: true, bower: false, yarn: false });
    }
};
