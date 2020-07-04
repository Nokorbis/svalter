'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const buildQuestions = require('./questions.js');
const options = require('./options.js');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('appname', {desc: 'The name of what you are trying to create', required: false, type: String});

    options.forEach(option => {
      this.option(option.name, option.config);
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.rgb(235, 110, 50).bold('Svalter')} generator!`)
    );

    const prompts = buildQuestions(this);

    return this.prompt(prompts).then(props => {
      this.answers = props;
    });
  }

  configuring() {
    this.config.set('project-type', this._getProjectType());
  }

  _getProjectType() {
    if (this.options.svelte) {
      return 'svelte';
    }

    if (this.options.sapper) {
      return 'sapper';
    }

    if (this.options.library) {
      return 'library';
    }

    return this.answers['project-type'];
  }

  writing() {
    this.log({options: this.options});
    this.log({answers: this.answers});
    /*this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );*/
  }

  install() {
    //this.installDependencies();
  }
};
