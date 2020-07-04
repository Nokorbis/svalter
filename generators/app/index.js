'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('appname', {desc: 'The name of what you are trying to create', required: false, type: String})

    this.option('sapper', {desc: 'Create a sapper project', type: Boolean});
    this.option('svelte', {desc: 'Create a svelte project', type: Boolean});
    this.option('library', {desc: 'Create a component library project', type: Boolean});
    this.option('typescript', {desc: 'Adds typescript support to your project', type: Boolean, alias: 'ts'});
    this.option('sass', {desc: 'Adds SASS support to your project', type: Boolean, alias: 'scss'});
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.rgb(235, 110, 50).bold('Svalter')} generator!`)
    );

    const gen = this;

    const prompts = [
      {
        type: 'list',
        name: 'project-type',
        message: 'Type of project?',
        choices: ['sapper', 'svelte', 'library'],
        default: 1,
        when: function(responses) {
          return !gen.options.svelte && !gen.options.sapper && !gen.options.library;
        }
      },
      {
        type: 'input',
        name: 'project-name',
        message: 'Project\'s name: ',
        default: process.cwd().split(path.sep).pop(),
        when: function(responses) {
          if (gen.options.appname == null) {
            return true;
          }
          gen.options.appname = gen.options.appname.trim();
          return '' === gen.options.appname;
        }
      },
      {
        type: 'confirm',
        name: 'support-typescript',
        message: 'Do you want your project to support TypeScript?',
        default: false,
        when: function(responses) {
          return gen.options.typescript == null;
        }
      },
      {
        type: 'confirm',
        name: 'support-sass',
        message: 'Do you want your project to support SASS?',
        default: false,
        when: function(responses) {
          return gen.options.sass == null;
        }
      }
    ];

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
