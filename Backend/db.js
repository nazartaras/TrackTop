var mysql      = require('mysql');
var connection;

exports.connect = function() {
    if(connection)
        return;

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Vaao095037448182',
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

}

exports.insert_tehnic = function(tehnic,suc,error){

    connect();
    connection.connect(function(err){
        if (err) throw err;
        connection.query("INSERT INTO 'tracktop'.'tehnic' SET ?", tehnic, function(err, result) {
            error(err);
            suc(result);
        });
    })

}
