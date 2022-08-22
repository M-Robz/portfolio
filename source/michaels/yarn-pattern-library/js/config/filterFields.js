module.exports = function (isQuebec) {
    if (isQuebec) {
        return [
            {
                name: 'Category QUE',
                urlParam: 'categorie'
            }
        ];
    } else {
        return [
            {
                name: 'Category',
                urlParam: 'category'
            }
        ];
    }
};
