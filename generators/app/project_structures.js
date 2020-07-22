'use strict';
module.exports = {
    svelte: {
        template_root: 'svelte',
        static_dir: 'public',
        config_root: '.',
    },
    sapper: {
        template_root: 'sapper',
        static_dir: 'static',
        config_root: '.',
    },
    library: {
        template_root: 'library',
        config_root: './examples',
    },
};
