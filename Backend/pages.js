exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: ''
    });
};

exports.orderPage = function(req, res) {
    res.render('orders', {
        pageTitle: 'Замовлення'
    });
};