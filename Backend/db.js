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

// inserts

exports.insert_check_equipments = function(check_equipments,callback){
    connection.query("INSERT INTO tracktop.check_equipments SET ?", check_equipments, callback);
}

exports.insert_check_technics = function(check_technics,callback){
    connection.query("INSERT INTO tracktop.check_technics SET ?", check_technics, callback);
}

exports.insert_images_technics = function(images_technics,callback){
    connection.query("INSERT INTO tracktop.images_technics SET ?", images_technics, callback);
}

exports.insert_images_equipments = function(images_equipments,callback){
    connection.query("INSERT INTO tracktop.images_equipments SET ?", images_equipments, callback);
}

exports.insert_orders_equipments = function(orders_equipments,callback){
    connection.query("INSERT INTO tracktop.orders_equipments SET ?", orders_equipments, callback);
}

exports.insert_orders_technics = function(orders_technics,callback){
    connection.query("INSERT INTO tracktop.orders_technics SET ?", orders_technics, callback);
}

exports.insert_providers_technics = function(providers_technics,callback){
    connection.query("INSERT INTO tracktop.providers_technics SET ?", providers_technics, callback);
}

exports.insert_providers_equipments = function(providers_equipments,callback){
    connection.query("INSERT INTO tracktop.providers_equipments SET ?", providers_equipments, callback);
}

exports.insert_technics_equipments = function(technics_equipments,callback){
    connection.query("INSERT INTO tracktop.technics_equipments SET ?", technics_equipments, callback);
}
//select methods

exports.get_types_of_technics = function(callback){
    connection.query("SELECT * FROM tracktop.types_of_technics",callback);
}

exports.get_marks_of_technics = function(callback){
    connection.query("SELECT * FROM tracktop.marks_of_technics",callback);
}

////
// select for technics
exports.get_technics_by_mark_name = function(mark_of_technics,callback){
    connection.query("SELECT * FROM tracktop.technics INNER JOIN (SELECT * FROM tracktop.marks_of_technics as R1 WHERE R1.name = "+mark_of_technics +
        "ON tracktop.technics.mark_id = R1.mark_id",callback);
}

exports.get_technics_by_type_name = function(type_of_technics,callback){
    connection.query("SELECT * FROM (tracktop.technics NATURAL JOIN tracktop.marks_of_technics)  INNER JOIN (SELECT id,name type_name,photo_location FROM tracktop.types_of_technics WHERE name = '"+type_of_technics+
        "') T ON technics.type_id = T.id ",callback);
}

exports.get_technics_by_type_and_mark = function(type_of_technics, mark_of_technics, callback){
    connection.query("SELECT * FROM tracktop.technics INNER JOIN (SELECT * FROM tracktop.types_of_technics as R1 WHERE R1.name = "+type_of_technics+
        "ON tracktop.types_of_technics.type_id = R1.type_id INNER JOIN (SELECT * FROM tracktop.marks_of_technics as R2 WHERE R1.name = "+mark_of_technics +
        +"ON tracktop.technics.mark_id = R2.mark_id",callback);
}

exports.get_technics_price_more = function(price,callback){
    connection.query("SELECT * FROM tracktop.technics WHERE tracktop.technics.price >" + price,callback);
}

exports.get_technics_price_less = function(price,callback){
    connection.query("SELECT * FROM tracktop.technics WHERE tracktop.technics.price <" + price,callback);
}

exports.get_technics_by_model = function(model,callback){
    connection.query("SELECT * FROM tracktop.technics WHERE tracktop.technics.model =" + model,callback);
}

exports.get_technic_by_type_model_mark = function(type_of_technics, mark_of_technics,model, callback){
    connection.query("SELECT * FROM (tracktop.technics inner join (select id id_mark,name mark_name from tracktop.marks_of_technics) D on technics.mark_id = D.id_mark) \n" +
        "INNER JOIN (SELECT id,name type_name,photo_location from tracktop.types_of_technics WHERE name= '" + type_of_technics+"') L\n" +
        "on type_id = L.id\n" +
        "WHERE model = " + model+" AND mark_name= '"+mark_of_technics+"'" , callback);
}

exports.get_technics_by_country = function(country,callback){
    connection.query("SELECT * FROM tracktop.technics WHERE tracktop.technics.country_producer =" + country,callback);
}


exports.get_technics = function(callback){
    connection.query("SELECT * FROM (tracktop.technics INNER JOIN tracktop.types_of_technics on technics.type_id = types_of_technics.id) INNER JOIN tracktop.marks_of_technics on technics.mark_id = marks_of_technics.id",callback);
}
exports.get_client_by_phone = function(phone,callback){
    connection.query("SELECT * FROM tracktop.clients WHERE tracktop.clients.phone_number =" + phone,callback);
}


// delete operations

exports.delete_technics = function(id,callback){
    connection.query("DELETE FROM tracktop.technics WHERE tracktop.technics.id = "+ id,callback);
}

exports.delete_types_of_technics = function(id,callback){
    connection.query("DELETE FROM tracktop.types_of_technics WHERE tracktop.types_of_technics.id = "+ id,callback);
}

exports.delete_marks_of_technics = function(id,callback){
    connection.query("DELETE FROM tracktop.marks_of_technics WHERE tracktop.marks_of_technics.id = "+ id,callback);
}

///

exports.delete_equipments = function(id,callback){
    connection.query("DELETE FROM tracktop.equipments WHERE tracktop.equipments.id = "+ id,callback);
}
exports.delete_client = function(id,callback){
    connection.query("DELETE FROM tracktop.clients WHERE tracktop.clients.id = "+ id,callback);
}

exports.delete_provider = function(id,callback){
    connection.query("DELETE FROM tracktop.providers WHERE tracktop.providers.id = "+ id,callback);
}

exports.delete_check = function(id,callback){
    connection.query("DELETE FROM tracktop.checks WHERE tracktop.checks.id = "+ id,callback);
}

// update methods

exports.update_provider = function(id,provider,callback){
    connection.query("UPDATE tracktop.providers SET ?"+ provider + "WHERE id = "+ id,callback);
}

exports.update_check = function(id,check,callback){
    connection.query("UPDATE tracktop.checks SET ?"+ check + "WHERE id = "+ id,callback);
}

exports.update_client = function(id,client,callback){
    connection.query("UPDATE tracktop.clients SET ?"+ client + "WHERE id = "+ id,callback);
}

exports.update_equipments = function(id,equipment,callback){
    connection.query("UPDATE tracktop.equipments SET ?"+ equipment + "WHERE id = "+ id,callback);
}

exports.update_mark_of_technic = function(id,mark,callback){
    connection.query("UPDATE tracktop.marks_of_technics SET ?"+ mark + "WHERE id = "+ id,callback);
}

exports.update_type_of_technic = function(id,type,callback){
    connection.query("UPDATE tracktop.types_of_technics SET ?"+ type + "WHERE id = "+ id,callback);
}

exports.update_technic = function(id,technic,callback){
    connection.query("UPDATE tracktop.technics SET ?"+ technic + "WHERE id = "+ id,callback);
}