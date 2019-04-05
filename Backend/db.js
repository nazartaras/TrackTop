var mysql      = require('mysql');
var connection;

exports.connect = function() {
     if(connection===null)
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

exports.insert_tehnic = function(tehnic,callback){
    connection.query("INSERT INTO tracktop.technic SET ?", tehnic, callback);
}

exports.insert_equipment = function(equipment,callback){
    connection.query("INSERT INTO tracktop.equipment SET ?", equipment, callback);
}

exports.insert_type_of_technics = function(type_of_technics,callback){
    connection.query("INSERT INTO tracktop.types_of_technics SET ?", type_of_technics, callback);
}

