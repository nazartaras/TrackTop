var API_URL = "http://localhost:5050";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
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

exports.addTehnic = function(tehnic, callback) {
    backendPost("/api/addtechnic/", tehnic, callback);
};

exports.addClient = function(client, callback) {
    backendPost("/api/addclient/", client, callback);
};


exports.sign_in = function(phone, callback) {
    backendPost("/api/sign_in/", phone, callback);}

exports.getTypes = function(callback) {
    backendGet("/api/gettypes/", callback);

};
exports.getMarks = function(callback) {
    backendGet("/api/getmarks/", callback);

};

exports.getTechnics = function(callback) {
    backendGet("/api/gettechnics/", callback);
};

exports.getTechnicsByType = function(tp,callback) {
    backendPost("/api/gettechnics/", tp, callback);
};
