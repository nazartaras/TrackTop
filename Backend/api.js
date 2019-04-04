exports.addTehnic = function(req, res) {
    var db = require('./db');
    var info = req.body;

    function suc(res){
        console.log("Success! ", res);
    }

    function err(err) {
        console.log("Error! ", err);
    }

    db.insert_tehnic(info,suc,err);

    res.send({
        success: true
    });
};

