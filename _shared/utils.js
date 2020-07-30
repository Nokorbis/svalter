module.exports = {
    coalesce: function (option, answer, defaultValue) {
        if (option == null && answer == null) {
            return defaultValue;
        }
        if (typeof option === 'string') {
            option = option.trim();
        }
        if (typeof answer === 'string') {
            answer = answer.trim();
        }
        if (option == null) {
            return answer;
        }
        return option;
    },

    getConfiguration: function (generator) {
        const preprocessors = generator.config.get('support-preprocessors');
        return {
            script_separation: preprocessors.includes('script-separation'),
            style_separation: preprocessors.includes('style-separation'),
            sass: preprocessors.includes('sass'),
            typescript: preprocessors.includes('typescript'),
        };
    },
};
