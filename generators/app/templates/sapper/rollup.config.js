import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

<% if (typescript) { -%> import typescript from '@rollup/plugin-typescript'; <% } -%>

<% if (has_preprocessors) { -%>
import { preprocess } from './svelte.config.js';
<% } -%>

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);

<% if (typescript) { -%>
function adaptScriptExtension(input) {
  if (typeof input !== 'string') {
    return {server: input.server.replace(/\.js$/, '.ts')};
  }
  return input.replace(/\.js$/, '.ts');
}
<% } else { -%>
function adaptScriptExtension(input) {
    return input;
}
<% } -%>

export default {
    client: {
        input: adaptScriptExtension(config.client.input()),
        output: config.client.output(),
        plugins: [
            replace({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
                __APP_NAME__: '<%= project_name %>',
            }),
            svelte({
              <% if (has_preprocessors) { -%>preprocess: preprocess(dev),<% } -%>
                dev,
                hydratable: true,
                emitCss: true,
            }),
            resolve({
                browser: true,
                dedupe: ['svelte'],
            }),
            commonjs(),
            <% if (typescript) { -%>
            typescript(),
            <% } -%>
            legacy &&
                babel({
                    extensions: ['.js', '.mjs', '.html', '.svelte'],
                    babelHelpers: 'runtime',
                    exclude: ['node_modules/@babel/**'],
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: '> 0.25%, not dead',
                            },
                        ],
                    ],
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                        [
                            '@babel/plugin-transform-runtime',
                            {
                                useESModules: true,
                            },
                        ],
                    ],
                }),

            !dev &&
                terser({
                    module: true,
                }),
        ],

        preserveEntrySignatures: false,
        onwarn,
    },

    server: {
        input: adaptScriptExtension(config.server.input()),
        output: config.server.output(),
        plugins: [
            replace({
                'process.browser': false,
                'process.env.NODE_ENV': JSON.stringify(mode),
                __APP_NAME__: '<%= project_name %>',
            }),
            svelte({
                <% if (has_preprocessors) { -%>preprocess: preprocess(dev),<% } -%>
                generate: 'ssr',
                dev,
            }),
            resolve({
                dedupe: ['svelte'],
            }),
            commonjs(),
            <% if (typescript) { -%>
            typescript(),
            <% } -%>
        ],
        external: Object.keys(pkg.dependencies).concat(
            require('module').builtinModules || Object.keys(process.binding('natives'))
        ),

        preserveEntrySignatures: 'strict',
        onwarn,
    },

    serviceworker: {
        input: adaptScriptExtension(config.serviceworker.input()),
        output: config.serviceworker.output(),
        plugins: [
            resolve(),
            replace({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            commonjs(),
            <% if (typescript) { -%>
            typescript(),
            <% } -%>
            !dev && terser(),
        ],

        preserveEntrySignatures: false,
        onwarn,
    },
};
