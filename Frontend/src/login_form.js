exports.openForm = function() {
    document.getElementById("myForm").style.display = "block";
}

var user_info_dispalyed = false;
exports.closeForm = function() {
    document.getElementById("myForm").style.display = "none";
}


exports.userInfo = function() {
    if(user_info_dispalyed) {
    document.getElementById("user_info").style.display = "none";
        user_info_dispalyed = false;}
    else {
        document.getElementById("user_info").style.display = "block";
        user_info_dispalyed = true;
    }
}


var $phone = $('#myForm input[name=phone]')[0];
var $password = $('#myForm input[name=psw]')[0];

var status = false;
var info;

exports.getInfo = function(){
    return {
        status:status,
        info: info
    }
}

exports.login = function(){
    $('#log_in_btn').click(function() {
        var phone = $phone.value;
        var password = $password.value;

        console.log(password);
        require("./API").sign_in({
            phone_number: phone,
            password: password
        }, function (err,data) {
                    if(data.error) {
                        console.log(data.error);
                        alert( "Не вірний пароль" );
                    }
                    else if(!(data[0]==null)){
                        status = true;
                        info = {
                            name: data.data[0].name,
                            surname: data.data[0].surname,
                            phone: data.data[0].phone

                        }
                        require('./user_form').isLogged();
                    }
                    else if(!(data==null)){
                        status = true;
                        info = {
                            name: data.data.name,
                            surname: data.data.surname,
                            phone: data.data.phone_number

                        }
                        require('./user_form').isLogged();
                    }
        });
    });
}
