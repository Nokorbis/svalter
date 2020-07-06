'use strict';
module.exports = class Normalizer {
    normalizePackageName(name) {
        return name
            .trim()
            .toLowerCase()
            .replace(/\s+/, ' ')
            .replace(/[ ']/, '-')
            .replace(/[êèéë]/, 'e')
            .replace(/[âàáä]/, 'a')
            .replace(/[ôòóö]/, 'o')
            .replace(/[ûùúüµ]/, 'u')
            .replace(/[îìíï]/, 'i')
            .replace(/[&@#§!]/, '');
    }
};
