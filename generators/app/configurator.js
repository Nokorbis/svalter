module.exports = class Configurator {
    saveConfigurationsFromInputs(generator) {
        generator.config.set('project-type', this._getProjectType(generator));
        generator.config.set('project-name', this._getProjectName(generator));
        generator.config.set('support-sass', this._getSupportSass(generator));
        generator.config.set('support-typescript', this._getSupportTypeScript(generator));
        generator.config.set('css-reset', this._getCSSReset(generator));
    }

    _getProjectType(generator) {
        if (generator.options.svelte) {
            return 'svelte';
        }

        if (generator.options.sapper) {
            return 'sapper';
        }

        if (generator.options.library) {
            return 'library';
        }

        return generator.answers['project-type'];
    }

    _getProjectName(generator) {
        if (generator.options.appname) {
            return generator.options.appname;
        }

        return generator.answers['project-name'];
    }

    _getSupportTypeScript(generator) {
        if (generator.options.typescript !== null) {
            return generator.options.typescript;
        }

        return generator.answers['support-typescript'];
    }

    _getSupportSass(generator) {
        if (generator.options.sass !== null) {
            return generator.options.sass;
        }

        return generator.answers['support-sass'];
    }

    _getCSSReset(generator) {
        let opt = generator.options['css-reset'];
        if (opt !== null) {
            opt = opt.toLowerCase();
            if (opt === 'meyer_reset' || opt === 'normalize' || opt === 'sanitize') {
                return opt;
            }

            return 'none';
        }

        return generator.answers['css-reset'];
    }
};
