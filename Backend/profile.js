exports.initializeUser = function () {
    var phone = localStorage.getItem('phone');

    var db = require('./db');

    function callback(error,data){
        if(data.error) {
            console.log(data.error);
            alert( "Не вірний пароль" );
        }
        else if(!(data.data[0]==null)){
            localStorage.setItem('status',true);
            localStorage.setItem('name',data.data[0].name);
            localStorage.setItem('surname',data.data[0].surname);
            localStorage.setItem('phone',data.data[0].phone_number);
            //closeForm();
            require('./user_form').isLogged();
        }
        else if(!(data==null)){
            localStorage.setItem('status',true);
            localStorage.setItem('name',data.data.name);
            localStorage.setItem('surname',data.data.surname);
            localStorage.setItem('phone',data.data.phone_number);
           // closeForm();
            require('./user_form').isLogged();
        }
    }

    db.get_client_by_phone(phone,callback);

}

exports.updateClient = function () {
    $('#update_user_info').click(function() {
        var surname = $('#surname_value').value;
        var name = $('#name_value').value;
        var phone_number = $('#phone_value').value;
        var location = $('#location_value').value;
        var location_post_office_value = $('#location_post_office_value').value;
        var post_office_number_value = $('#post_office_number_value').value;
        var pas =  $('#password_value').value;
        var conf_pas =  $('#password_confirm_value').value;

        if(pas!== conf_pas) alert("Паролі не збігаються");
        var cl = {
            surname: surname,
            name: name,
            phone_number: phone_number,
            settelment: location,
            nova_poshta_settlement:location_post_office_value,
            nova_poshta_number :post_office_number_value,
            hash: password
        }
        console.log(cl);
    });
}