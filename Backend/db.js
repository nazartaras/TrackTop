var mysql      = require('mysql');
var connection;

exports.connect = function() {
     if(connection===null)
         return;

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

}

exports.insert_tehnic = function(tehnic,suc,error){


        connection.query("INSERT INTO tracktop.technic SET ?", tehnic, function(err, result) {
            error(err);
            suc(result);
        });


}
