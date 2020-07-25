'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-svalter:app', () => {
    describe('simple svelte', function() {
        const simpleSvelteScenario = require('./_scenarios/simple-svelte.json');
        beforeAll(() => {
            return helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts(simpleSvelteScenario.choices);
        });

        it('should create files', () => {
            assert.file(simpleSvelteScenario.filesToCreate);
        });

        it('should not create some files', () => {
            assert.noFile(simpleSvelteScenario.filesNotToCreate);
        });

        it('should contain some data', () => {
            for (let entry of simpleSvelteScenario.filesContent) {
                assert.fileContent(entry.filePath, entry.content);
            }
        });

        it('should not contain some data', () => {
            for (let entry of simpleSvelteScenario.filesNoContent) {
                assert.noFileContent(entry.filePath, entry.content);
            }
        });
    });
});
