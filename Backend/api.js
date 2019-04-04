var db = require('./db');

exports.addTehnic = function(req, res) {

    info = req.body;

    function suc(res){
        console.log("Success! ", res);
        res.send({
            success: true,
            added: true
        });
    }

    function err(err) {
        console.log("Error! ", err);
        res.send({
            success: true,
            added: false
        });
    }

    db.insert_tehnic(info,suc,err);
};
