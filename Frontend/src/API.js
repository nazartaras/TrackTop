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

exports.addClient = function(client, callback) {
    backendPost("/api/addclient/", client, callback);
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

/////// adedd
exports.getClientbyPhone = function(phone,callback) {
    backendGet("/api/getclient/", callback, {phone_number: phone});
};
/////

exports.getTechnics = function(callback) {
    backendGet("/api/gettechnics/", callback);
};

exports.getTechnicsByType = function(tp,callback) {
    backendPost("/api/gettechnics/", tp, callback);
};

exports.getTechnicsImagesByTypeMarkModel = function(tp,callback) {
    backendPost("/api/gettechnicsmodelim/", tp, callback);
};

exports.uploadUserPhoto = function(photo,callback){
    var data = new FormData();
    data.append('uploadFile', photo);
    backendPostFiles("/api/upload_user_photo/", data, callback);
};

exports.updateClient = function(id,info,callback) {
    backendPost("/api/update_user",{id: id, info: info},callback);
}