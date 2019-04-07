var modal = document.getElementById('id01');
var passwordHash = require('password-hash');

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

checkValidation = function(){
    var name = document.forms["modal-content"]["name"];
    var surname = document.forms["modal-content"]["surname"];
    var phone = document.forms["modal-content"]["phone"];
    var password = document.forms["modal-content"]["password"];
    var address = document.forms["modal-content"]["location"];

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
        console.log('121212121212121223323232312');
       // var checked = checkValidation();
       // if (checked) {
            var name = document.forms["modal-content"]["name"];
            var surname = document.forms["modal-content"]["surname"];
            var phone = document.forms["modal-content"]["phone"];
            var password = document.forms["modal-content"]["password"];
            var address = document.forms["modal-content"]["location"];

            var hashedPassword = passwordHash.generate(password);

            var newT = {
                surname: surname,
                name: name,
                phone_number: phone,
                settlement: address,
                hash: hashedPassword
            }

            console.log(newT);

            require("./API").addClient(newT, function (err, data) {
                if (data.error) console.log(data.error);
            });
       // }

    });
}