exports.isLogged = function () {
    var name = localStorage.getItem('name');
    var surname = localStorage.getItem('surname');
    var status = localStorage.getItem('status');
    var phone = localStorage.getItem('phone');
    var photo_location = localStorage.getItem("photo_location");
    if(status) {
        console.log('status true');
        // add info to panel
        $('#full_name').html('<b>' +surname + " " + name + '</b>');
        $('#user_phone').html('<b>' + phone + '</b>');
        $('#user_photo').css("display","block");
        $('#user_photo').attr("src", "http://localhost:5050/images/user_images/"+photo_location);
        $('#login').css("display", "none");
        $('#signup').css("display", "none");
    }
    else {
        $('#user_photo').css("display","none");
        $('#login').css("display","block");
        $('#signup').css("display","block");
    }
}

exports.openLogin = function(){
    $('#full_name').html('<b>' +surname + " " + name + '</b>');
    $('#user_phone').html('<b>' + phone + '</b>');
    $('#user_photo').css("display","block");
    $('#login').css("display", "none");
    $('#signup').css("display", "none");
}

exports.deleteInfoFromLocalStorage = function() {
    localStorage.removeItem("status");
    localStorage.removeItem("phone");
    localStorage.removeItem("name");
    localStorage.removeItem("settlement");
    localStorage.removeItem("surname");
    localStorage.removeItem("photo_location");
    require("./user_form").isLogged();
}

exports.openUserEditPage = function () {
    
}
