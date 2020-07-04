module.exports = class Configurator {
    saveConfigurationsFromInputs(generator) {
        generator.config.set('project-type', this._getProjectType());
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
};
