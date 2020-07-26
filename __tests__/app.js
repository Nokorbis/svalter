'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-svalter:app', () => {
    describe('svelte-simple', function () {
        const simpleSvelteScenario = require('./_scenarios/svelte-simple.json');
        executeScenario(simpleSvelteScenario);
    });

    describe('svelte-complete', function () {
        const scenario = require('./_scenarios/svelte-complete.json');
        executeScenario(scenario);
    });

    describe('library-simple', function () {
        const scenario = require('./_scenarios/library-simple.json');
        executeScenario(scenario);
    });

    describe('library-complete', function () {
        const scenario = require('./_scenarios/library-complete.json');
        executeScenario(scenario);
    });

    describe('sapper-simple', function () {
        const scenario = require('./_scenarios/sapper-simple.json');
        executeScenario(scenario);
    });

    describe('sapper-external-sass', function () {
        const scenario = require('./_scenarios/sapper-external-sass.json');
        executeScenario(scenario);
    });
});

function executeScenario(scenario) {
    beforeAll(() => {
        return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(scenario.choices);
    });

    if (scenario.filesToCreate) {
        it('should create files', () => {
            assert.file(scenario.filesToCreate);
        });
    }

    if (scenario.filesNotToCreate) {
        it('should not create some files', () => {
            assert.noFile(scenario.filesNotToCreate);
        });
    }

    if (scenario.filesContent) {
        it('should contain some data', () => {
            for (let entry of scenario.filesContent) {
                for (let content of entry.contents) {
                    assert.fileContent(entry.filePath, content);
                }
            }
        });
    }

    if (scenario.filesNoContent) {
        it('should not contain some data', () => {
            for (let entry of scenario.filesNoContent) {
                for (let content of entry.contents) {
                    assert.noFileContent(entry.filePath, content);
                }
            }
        });
    }
}
