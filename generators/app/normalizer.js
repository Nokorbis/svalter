module.exports = class Normalizer {
    normalizePackageName(name) {
        return name
            .trim()
            .toLowerCase()
            .replace(/\s+/, ' ')
            .replace(' ', '-')
            .replace("'", '-')
            .replace(/[éè]/, 'e')
            .replace(/[àá]/, 'a')
            .replace(/[ô]/, 'o')
            .replace(/[ùµ]/, 'u')
            .replace(/[ï]/, 'i')
            .replace(/[&@#§!]/, '');
    }
};
