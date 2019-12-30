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
    connection.query("INSERT INTO tracktop.technics SET ?", tehnic, callback);
}

exports.insert_review = function(review,callback){
    connection.query("INSERT INTO tracktop.reviews SET ?", review, callback);
}

exports.insert_equipment = function(equipment,callback){
    connection.query("INSERT INTO tracktop.equipments SET ?", equipment, callback);
}

exports.insert_model = function(model,callback){
    connection.query("INSERT INTO tracktop.models SET ?", model, callback);
}

exports.insert_equipments_models = function(equipments_models,callback){
    connection.query("INSERT INTO tracktop.equipments_models SET ?", equipments_models, callback);
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

exports.insert_technic_photos = function(photos,id,callback){

    for(var i=0;i<photos.length;i++){
        connection.query("INSERT INTO tracktop.images_technics SET ?", {file_name:photos[i].val,id_technic:id}, callback);
    }
}
//select methods

exports.get_id = function (table_name, name , callback) {
    connection.query("SELECT id FROM tracktop."+table_name + " where name= '" + name + "'",callback);
}

exports.get_types_of_technics = function(callback){
    connection.query("SELECT * FROM tracktop.types_of_technics",callback);
}

exports.get_marks_of_technics = function(callback){
    connection.query("SELECT * FROM tracktop.marks_of_technics",callback);
}

exports.get_reviews = function(callback){
    connection.query("SELECT text_review, reviews.show, reviews.recommend, photo_location, clients.name, clients.surname  FROM tracktop.reviews inner join tracktop.clients on clients.id=client_id",callback);
}

exports.get_review = function(id,callback){
    connection.query("SELECT text_review, reviews.show, reviews.recommend, photo_location, clients.name, clients.surname  FROM tracktop.reviews inner join tracktop.clients on clients.id=client_id where client_id = '" + id+"'",callback);
}

////
// select for technics
exports.get_technics_by_mark_name = function(mark_of_technics,callback){
connection.query("SELECT * FROM (tracktop.technics INNER JOIN (SELECT id as type_id ,name type_name,photo_location FROM tracktop.types_of_technics) T " +
    "ON technics.type_id = T.type_id ) inner JOIN (select id as mark_id, name  From tracktop.marks_of_technics Where name = '" +
    mark_of_technics  +"') R1 ON technics.mark_id = R1.mark_id",callback);
}



exports.get_technics_by_type_name = function(type_of_technics,callback){
    connection.query("SELECT * FROM (tracktop.technics inner JOIN (select id as marks_of_technics_id , name from tracktop.marks_of_technics) k On k.marks_of_technics_id=technics.mark_id )  INNER JOIN (SELECT id as type_id ,name type_name,photo_location FROM tracktop.types_of_technics WHERE name = '"+type_of_technics+
        "') T ON technics.type_id = T.type_id ",callback);
}

exports.get_technics_by_type_and_mark = function(type_of_technics, mark_of_technics, callback){
    connection.query("SELECT * FROM tracktop.technics INNER JOIN (SELECT * FROM tracktop.types_of_technics as R1 WHERE R1.name = "+type_of_technics+
        "ON tracktop.types_of_technics.type_id = R1.type_id INNER JOIN (SELECT * FROM tracktop.marks_of_technics as R2 WHERE R1.name = "+mark_of_technics +
        +"ON tracktop.technics.mark_id = R2.mark_id",callback);
}
/*
exports.get_technic_by_type_model_mark = function(type_of_technics, mark_of_technics,model, callback){
    connection.query("SELECT * FROM (tracktop.technics inner join (select id id_mark,name mark_name from tracktop.marks_of_technics) D on technics.mark_id = D.id_mark) \n" +
        "INNER JOIN (SELECT id,name type_name,photo_location from tracktop.types_of_technics WHERE name= " + type_of_technics+") L\n" +
        "on type_id = L.id\n" +
        "WHERE model = " + model + " AND mark_name= '"+mark_of_technics+"'" , callback);
}
*/
exports.get_technic_im_by_type_model_mark = function(type_of_technics, mark_of_technics,model, callback){
    console.log("SELECT file_name from (SELECT id FROM (tracktop.technics inner join (select id id_mark,name mark_name from tracktop.marks_of_technics) D on technics.mark_id = D.id_mark) "+
        "INNER JOIN (SELECT id id_type,name type_name,photo_location from tracktop.types_of_technics WHERE name='"+type_of_technics+"') L " +
        "on type_id = L.id_type WHERE model ='" + model+ "' AND mark_name='" +mark_of_technics+
        "' ) Q inner join tracktop.images_technics on images_technics.id_technic=Q.id");
    connection.query("SELECT file_name from (SELECT id FROM (tracktop.technics inner join (select id id_mark,name mark_name from tracktop.marks_of_technics) D on technics.mark_id = D.id_mark) "+
        "INNER JOIN (SELECT id id_type,name type_name,photo_location from tracktop.types_of_technics WHERE name='"+type_of_technics+"') L " +
        "on type_id = L.id_type WHERE model ='" + model+ "' AND mark_name='" +mark_of_technics+
        "' ) Q inner join tracktop.images_technics on images_technics.id_technic=Q.id"
        , callback);
}

exports.get_technic_im_by_id = function(id, callback){
    connection.query("SELECT file_name from tracktop.images_technics where id_technic="+id, callback);
}

exports.get_equipment_im_by_id = function(id, callback){
    connection.query("SELECT file_name from tracktop.images_equipments where id_equipment="+id, callback);
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

exports.get_models_by_type_mark = function(type,mark,callback){
    if (mark==null || mark.toString().length==0)   connection.query("SELECT Distinct * FROM tracktop.models WHERE tracktop.models.technic_type = '" + type +"'",callback);
    else if (type!=null && mark !=null)
    connection.query("SELECT Distinct model FROM tracktop.models WHERE tracktop.models.technic_type = '" + type +"' AND tracktop.models.technic_mark = '"+ mark+"'",callback);
    console.log("mark = " + mark);
    console.log("mark len = " + mark.toString().length);
}

exports.get_models = function(callback){
    connection.query("SELECT * FROM tracktop.models",callback);
}


exports.get_technic_by_type_model_mark = function(type_of_technics, mark_of_technics,model, callback){
    connection.query("SELECT * FROM (tracktop.technics inner join (select id id_mark,name mark_name from tracktop.marks_of_technics) D on technics.mark_id = D.id_mark) \n" +
        "INNER JOIN (SELECT id,name type_name,photo_location from tracktop.types_of_technics WHERE name= '" + type_of_technics+"') L\n" +
        "on type_id = L.id\n" +
        "WHERE model = '" + model+"' AND mark_name= '"+mark_of_technics+"'" , callback);
}


exports.get_technics_by_country = function(country,callback){
    connection.query("SELECT * FROM tracktop.technics WHERE tracktop.technics.country_producer =" + country,callback);
}


exports.get_technics = function(callback){
    connection.query("SELECT technics.id, technics.mark_id , technics.type_id, technics.amount,technics.price,technics.delivery_time,technics.state,technics.model,technics.reserved_amount,technics.production_date,technics.country_producer,technics.shipping_date,technics.currency,technics.main_photo_location,technics.description, types_of_technics.id as types_of_technics_id , types_of_technics.name as types_of_technics_name , photo_location , marks_of_technics.id as marks_of_technics_id,marks_of_technics.name as marks_of_technics_name FROM (tracktop.technics INNER JOIN tracktop.types_of_technics on technics.type_id = types_of_technics.id) INNER JOIN tracktop.marks_of_technics on technics.mark_id = marks_of_technics.id",callback);
}

exports.get_technics_by_id = function(id,callback){
    connection.query("SELECT technics.id, technics.mark_id , technics.type_id, technics.amount,technics.price,technics.delivery_time,technics.state,technics.model,technics.reserved_amount,technics.production_date,technics.country_producer,technics.shipping_date,technics.currency,technics.main_photo_location,technics.description, types_of_technics.id as types_of_technics_id , types_of_technics.name as types_of_technics_name , photo_location , marks_of_technics.id as marks_of_technics_id,marks_of_technics.name as marks_of_technics_name FROM (tracktop.technics INNER JOIN tracktop.types_of_technics on technics.type_id = types_of_technics.id) INNER JOIN tracktop.marks_of_technics on technics.mark_id = marks_of_technics.id where technics.id='"+id+"'",callback);
}


exports.get_client_by_phone = function(phone,callback){
    connection.query("SELECT * FROM tracktop.clients WHERE phone_number ='" + phone + "'",callback);
}

exports.get_equipments = function(callback){
    connection.query("SELECT * FROM tracktop.equipments",callback);
}

exports.get_equipment_by_id = function(id,callback){
    connection.query("SELECT * FROM tracktop.models inner join tracktop.equipments_models on models.id = equipments_models.model_id inner join tracktop.equipments on equipments.id = equipments_models.equipment_id where equipment_id = " + id,callback);
}

exports.get_equipments_by_model = function(model,callback) {
    connection.query("SELECT * FROM tracktop.models inner join equipments_models on models.id = equipments_models.model_id inner join equipments on equipments.id = equipments_models.equipment_id where"+
    "model = \'" + model + "\'", callback);
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

// exports.delete_user_photo = function(userId,callback){
//     connection.query("UPDATE tracktop.clients SET photo_location = 'avatar.png' WHERE  id = "+ userId,callback);
// }

///

exports.delete_equipments = function(id,callback){
    connection.query("DELETE FROM tracktop.equipments WHERE tracktop.equipments.id = "+ id,callback);
}

exports.delete_equipments_models = function(id,callback){
    connection.query("DELETE FROM tracktop.equipments_models WHERE tracktop.equipments_models.equipment_id = "+ id,callback);
}

exports.delete_client = function(id,callback){
    connection.query("DELETE FROM tracktop.clients WHERE tracktop.clients.id = "+ id,callback);
}

exports.delete_review = function(id,callback){
    connection.query("DELETE FROM tracktop.reviews WHERE review_id = "+ id,callback);
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
    connection.query("UPDATE tracktop.clients SET ? WHERE id = ?", [client,id],callback);
}

exports.update_client_by_phone = function(phone,client,callback){
    connection.query("UPDATE tracktop.clients SET ? "+ client + " WHERE phone_number = "+ phone,callback);
}

exports.update_equipments = function(id,equipment,callback){
    connection.query("UPDATE tracktop.equipments SET name = 'newname' WHERE id = "+ id,callback);
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

exports.update_review = function(id,review,callback){
    connection.query("UPDATE tracktop.reviews SET ?"+ review + "WHERE id = "+ id,callback);
}