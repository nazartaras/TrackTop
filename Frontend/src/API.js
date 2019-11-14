var API_URL = "http://localhost:5050";

function backendGet(url, callback, data) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        data: data,
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPostFiles(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        cache: false,
        contentType : false,
        processData: false,
        data: data,
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.addTehnic = function(tehnic, callback) {
    backendPost("/api/addtechnic/", tehnic, callback);
};

exports.addEquipment = function(equipment, callback) {
    backendPost("/api/addequipment/", equipment, callback);
};

exports.addEquipmentsModels = function(equipment_model, callback) {
    backendPost("/api/addequipmentsmodels/", equipment_model, callback);
};

exports.addTypeTechnics = function(type, callback) {
    backendPost("/api/addtypetechnics/", type, callback);
};

exports.addMarkTechnic = function(mark, callback) {
    backendPost("/api/addmarktechnics/", mark, callback);
};

exports.addModel = function(model, callback) {
    backendPost("/api/addmodel/", model, callback);
};

exports.addClient = function(client, callback) {
    backendPost("/api/addclient/", client, callback);
};

exports.addCheck = function(check, callback) {
    backendPost("/api/addcheck/", check, callback);
};
exports.addCheck_equipment = function(check_equipment, callback) {
    backendPost("/api/addcheckequipment/", check_equipment, callback);
};
exports.addCheck_technic = function(check_technic, callback) {
    backendPost("/api/addchecktechnic/", check_technic, callback);
};

exports.sign_in = function(phone, callback) {
    backendPost("/api/signin/", phone, callback);
}


exports.getTypes = function(callback) {
    backendGet("/api/gettypes/", callback);
};

exports.getMarks = function(callback) {
    backendGet("/api/getmarks/", callback);
};

exports.getId = function(table_name, name,callback) {
    backendGet("/api/getid/", callback,{table_name :table_name, name:name});
};

exports.getModelsbyTypeMark = function(type,mark,callback) {
    backendGet("/api/getmodelsbytypemark/", callback,{type:type, mark:mark});
};

exports.getModels = function(callback) {
    backendGet("/api/getmodels/", callback);
};

/////// adedd
exports.getClientbyPhone = function(phone,callback) {
    backendGet("/api/getclient/", callback, {phone_number: phone});
};
/////

exports.getTechnics = function(callback) {
    backendGet("/api/gettechnics/", callback);
};

exports.getEquipments = function(callback) {
    backendGet("/api/getequipments/", callback);
};

exports.getTechnicsByType = function(tp,callback) {
    backendPost("/api/gettechnics/", tp, callback);
};

// exports.getTechnicsImagesByTypeMarkModel = function(tp,callback) {
//     backendPost("/api/gettechnicsmodelim/", tp, callback);
// };

exports.getTechnicsImagesById = function(id,callback) {
    backendPost("/api/gettechnicsmodelim/", {id: id}, callback);
};

exports.getEquipmentImagesById = function(id,callback) {
    backendPost("/api/getequipmentim/", {id: id}, callback);
};

exports.uploadUserPhoto = function(photo,callback){
    var data = new FormData();
    data.append('uploadFile', photo);
    backendPostFiles("/api/upload_user_photo/", data, callback);
};

exports.updateClient = function(id,info,callback) {
    backendPost("/api/update_user",{id: id, info: info},callback);
}