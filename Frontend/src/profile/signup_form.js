var modal = document.getElementById('id01');

function openSignUpForm() {
    modal.style.display='block';
}

exports.initializeLogin = function(){
    $('#signup').click(function() {
        openSignUpForm();
        addClient();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {

        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

var $name = $('#id01 input[name=name]')[0];
var $surname = $('#id01 input[name=surname]')[0];
var $phone = $('#id01 input[name=phone]')[0];
var $password = $('#id01 input[name=psw]')[0];
var $address = $('#id01 input[name=location]')[0];

checkValidation = function(){
    var name = $name.value;
    var surname = $surname.value;
    var phone = $phone.value;
    var password = $password.value;
    var address = $address.value;

    if (name.value == "")
    {
        window.alert("Please enter your name.");
        name.focus();
        return false;
    }

    if (address.value == "")
    {
        window.alert("Please enter your address.");
        name.focus();
        return false;
    }

  /*  /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/

        '123-345-3456';
    '(078)789-8908';
    '(078) 789-8908';
    */
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if(!phoneno.test(phone)) {
        alert("Введіть дісний номер\n" +
            "Приклад 093-345-3456");
        return false;
    }

    var regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{4,16}$/;

    if (password.length < 4 )
    {
        window.alert("Слабкий пароль");

        password.focus();
        return false
    }

    if(!regularExpression.test(password)) {
        alert("Пароль повинен містити як мінімум 1 цифру та 1 спеціальний символ");
        return false;
    }
        return true;
}

function addClient(){
    $('#signup_btn').click(function() {
       // var checked = checkValidation();
       // if (checked) {
        var name = $name.value;
        var surname = $surname.value;
        var phone = $phone.value;
        var password = $password.value;
        var address = $address.value;

        var newT = {
            surname: surname,
            name: name,
            phone_number: phone,
            settelment: address,
            hash: password
        }
        console.log(newT);
        require("../API").addClient(newT, function (err, data) {
            if (data.error) console.log(data.error);
            else {
                //TODO: сделать вызов авторизации
                localStorage.setItem('status',true);
                localStorage.setItem('status',true);
                localStorage.setItem('name',name);
                localStorage.setItem('surname',surname);
                localStorage.setItem('phone',phone);
                localStorage.setItem('settlement',address);
                require('./user_form').isLogged();
            }
        });
       // }

    });
}