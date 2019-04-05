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

