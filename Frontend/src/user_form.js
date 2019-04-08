exports.isLogged = function () {
    var name = localStorage.getItem('name');
    var surname = localStorage.getItem('surname');
    var status = localStorage.getItem('status');
    var phone = localStorage.getItem('phone');
    if(status) {
        // add info to panel
        $('#full_name').html('<b>' +surname + " " + name + '</b>');
        $('#user_phone').html('<b>' + phone + '</b>');
        $('#user_photo').css("display","block")
        $('#login').css("display", "none");
        $('#signup').css("display", "none");
    }
    else {
        $('#user_photo').css("display","none")
        $('#login').css("display","block")
        $('#signup').css("display","block")
    }
}

exports.openLogin = function(){
    $('#full_name').html('<b>' +surname + " " + name + '</b>');
    $('#user_phone').html('<b>' + phone + '</b>');
    $('#user_photo').css("display","block")
    $('#login').css("display", "none");
    $('#signup').css("display", "none");
}

exports.deleteInfoFromLocalStorage = function() {
    localStorage.clear();
    require("./user_form").isLogged();
}

exports.openUserEditPage = function () {
    
}
