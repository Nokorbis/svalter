'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-svalter:app', () => {
    describe('simple svelte', function() {
        const simpleSvelteScenario = require('./_scenarios/simple-svelte.json');
        executeScenario(simpleSvelteScenario);
    });

    describe('complete svelte', function() {
        const scenario = require('./_scenarios/complete-svelte.json');
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
