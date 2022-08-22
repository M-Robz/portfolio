module.exports = function (isQuebec, dynamicImgs) {
    return {
        filterFields: require('./filterFields')(isQuebec),
        custom: {
            itemConfig: require('./itemConfig')(dynamicImgs)
        }
    };
};
