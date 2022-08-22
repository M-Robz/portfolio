module.exports = function (dynamicImgs) {
    return {
        conditionalContent: require('./conditionalContent')(dynamicImgs),
        filterFields: require('./filterFields'),
        jsonFiles: require('./jsonFiles'),
        misc: require('./misc')
    };
}
