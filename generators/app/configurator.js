'use strict';
module.exports = class Configurator {
    saveConfigurationsFromInputs(generator) {
        generator.config.set('project-type', this._getProjectType(generator));
        generator.config.set('project-name', this._getProjectName(generator));
        generator.config.set('support-preprocessors', this._getSupportPreprocessors(generator));
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
        if (generator.options.typescript != null) {
            return generator.options.typescript;
        }

        return generator.answers['support-typescript'];
    }

    _getSupportPreprocessors(generator) {
        const answs = generator.answers['support-preprocessors'];

        const supported = [];
        if (
            generator.options.typescript != null ||
            (answs != null && answs.includes('typescript'))
        ) {
            supported.push('typescript');
        }

        if (generator.options.sass != null || (answs != null && answs.includes('sass'))) {
            supported.push('sass');
        }

        return supported;
    }

    _getCSSReset(generator) {
        if (!this._supportsCssReset(generator)) {
            return 'none';
        }

        let opt = generator.options['css-reset'];
        if (opt != null) {
            opt = opt.toLowerCase();
            if (opt === 'meyer_reset' || opt === 'normalize' || opt === 'sanitize') {
                return opt;
            }

            return 'none';
        }

        return generator.answers['css-reset'];
    }

    _supportsCssReset(generator) {
        return (
            generator.options['sapper'] === true ||
            generator.options['svelte'] === true ||
            'sapper' === generator.answers['project-type'] ||
            'svelte' === generator.answers['project-type']
        );
    }
};
