exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: ''
    });
};

exports.technics = function(req, res) {
    res.render('technicsPage', {
        pageTitle: 'Техніка',
        types: req.query.type
    });
};