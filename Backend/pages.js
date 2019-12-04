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
    if (req.query.type)
    res.render('technicsPage', {
        pageTitle: 'Купити ' + req.query.type + " Львівська область | купити бу " + req.query.type +" | TrackTop",
        types: req.query.type,
        mark: req.query.mark
    });
    else {
        res.render('technicsPage', {
            pageTitle: 'Купити ' + req.query.mark + " Львівська область | TrackTop",
            types: req.query.type,
            mark: req.query.mark
        });
    }
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
                    pageTitle: "купити " + type + ' ' + mark + ' ' + model + " Львівська обасть | TrackTop" ,
                    name: mark + ' ' + model,
                    technic: data[0]
                });
            }
        }
    });


};

exports.equipment = function(req, res) {
   // var model = req.query.model;

    console.log(req);

    require('./db').get_equipment_by_id(req.query.id, function (error,data) {

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

                res.render('oneEquipmentPage', {
                    equipment: data[0]
                });
            }
        }
    });


};

exports.equipments = function(req, res) {

    res.render('technicsPage', {
        pageTitle: 'Запчастини до сг техніки Львіська область | TrackTop',
        types: null,
        mark: null
    });

};

exports.about = (req, res) => {
    res.render('about', {
        pageTitle: 'Про компанію TrackTop'
    })
}

exports.reviews = (req, res) => {
    res.render('reviews', {
    })
}

exports.adminPanel = (req, res) => {
    res.render('adminPage', {
        pageTitle: 'admin panel',
        currPage: '1'
    })
}