var mysql      = require('mysql');
var connection;

exports.connect = function() {
     if(connection===null)
         return;

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'tracktop',
        password: 'tracktop123'
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

exports.insert_marks_of_technics = function(mark_of_technics,callback){
    connection.query("INSERT INTO tracktop.marks_of_technics SET ?", mark_of_technics, callback);
}

exports.insert_client = function(client,callback){
    connection.query("INSERT INTO tracktop.clients SET ?", client, callback);
}

exports.insert_provider = function(provider,callback){
    connection.query("INSERT INTO tracktop.providers SET ?", provider, callback);
}

exports.insert_check = function(check,callback){
    connection.query("INSERT INTO tracktop.checks SET ?", check, callback);
}

//select methods

exports.get_types_of_technics = function(callback){
    connection.query("SELECT * FROM tracktop.types_of_technics",callback);
}

exports.get_marks_of_technics = function(callback){
    connection.query("SELECT * FROM tracktop.marks_of_technics",callback);
}
