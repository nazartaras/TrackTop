exports.addTehnic = function(req, res) {
    var db = require('./db');
    var info = req.body;

    function callback(error,data){
        if(error) {
            console.log("Error! ", error.sqlMessage);
            res.send({
                success: true,
                error: error.sqlMessage
            });
        }
        else {
            console.log("Success! ", data);
            res.send({
                success: true,
                data: data
            });
        }
    }


    db.insert_tehnic(info,callback);

    // res.send({
    //     success: true
    // });
};


exports.addClient = function(req, res) {
    var db = require('./db');
    var info = req.body;
    info.hash = require('./hash').md5(info.hash);

    function callback(error,data){
        if(error) {
            console.log("Error! ", error.sqlMessage);
            res.send({
                success: true,
                error: error.sqlMessage
            });
        }
        else {
            console.log("Success! ", data);
            res.send({
                success: true,
                data: data
            });
        }
    }

    db.insert_client(info,callback);

};

/*
exports.sign_in = function(req, res) {
    var db = require('./db');
    var info = req.body;
*/

exports.get_types_of_technics = function (req,res) {
    var db = require('./db');


    function callback(error,data){
        if(error) {
            console.log("Error! ", error.sqlMessage);
            res.send({
                success: true,
                error: error.sqlMessage
            });
        }
        else {
            console.log("Success! ", data);
            res.send({
                success: true,
                data: data
            });
        }
    }

    db.get_types_of_technics(callback);
}


exports.get_Client = function (req,res) {
    var db = require('./db');

    var telPass = req.body;

    console.log("Second hash: "+require('./hash').md5(telPass.password));


exports.get_technics = function (req,res) {
    var db = require('./db');

    function callback(error,data){
        if(error) {
            console.log("Error! ", error.sqlMessage);
            res.send({
                success: true,
                error: error.sqlMessage
            });
        }
        else {
            console.log("Success! ", data);
            res.send({
                success: true,
                data: data
            });
        }
    }
    db.get_technics(callback);
}

exports.get_technics_by_tp = function (req,res) {
    var db = require('./db');


    function callback(error,data){
        if(error) {
            console.log("Error! ", error.sqlMessage);
            res.send({
                success: true,
                error: error.sqlMessage
            });
        }
        else {
            console.log("Success! ", data);

            if( require('./hash').md5(telPass.password) === data[0].hash )
                    res.send({
                    success: true,
                    data: data[0]
                });
            else
                res.send({
                    success: true,
                    error: 'wrong password'
                });
        }
    }

    db.get_client_by_phone(telPass.phone_number,callback);
}

            res.send({
                success: true,
                data: data
            });
        }
    }
    db.get_technics_by_type_name(req.body.type, callback);
}


