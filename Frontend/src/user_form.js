exports.isLogged = function () {
    var info = require('./login_form').getInfo();
    if(info.status) {
        // add info to panel
        $('#full_name').html('<b>' +info.info.surname + " " + info.info.name + '</b>');
        $('#user_phone').html('<b>' +info.info.phone + '</b>');
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
