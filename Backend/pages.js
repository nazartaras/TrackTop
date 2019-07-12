exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: ''
    });
};

exports.profile = function(req, res) {
    res.render('profile', {
        pageTitle: ''
    });
};

exports.technics = function(req, res) {
    res.render('technicsPage', {
        pageTitle: 'Техніка',
        types: req.query.type,
        mark: req.query.mark
    });
};

exports.technic = function(req, res) {
    var model = req.query.model;
    var mark = req.query.mark;
    var type = req.query.type;

    console.log("model"+ model + "mark = " + mark + "type" + type);


    require('./db').get_technic_by_type_model_mark(type,mark,model, function (error,data) {

        if(error) {
            console.log("Error! ", error.sqlMessage);
            res.send({
                success: true,
                error: error.sqlMessage
            });
        }
        else {

            if(data.length>0) {
               // console.log(data[0]+"\n");

                res.render('oneTechnicPage', {
                    pageTitle: type + ': ' + mark + ' ' + model,
                    name: mark + ' ' + model,
                    technic: data[0]
                });
            }
        }
    });


};

exports.equipments = function(req, res) {

    res.render('technicsPage', {
        pageTitle: 'Запчастини',
        types: null,
        mark: null
    });

};