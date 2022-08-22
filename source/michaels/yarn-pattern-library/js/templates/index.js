module.exports = function (locale, itemConfig) {
    return {
        item: require('./patternCard')(locale, itemConfig),
        filterOption: require('./filterOption')()
    };
};
