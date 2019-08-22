var modal = document.getElementById('id01');
var model_message = document.getElementById('messageModal');
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
        name.focus();
        return false;
    }

    if (address.value == "")
    {
        address.focus();
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

       // if (checkValidation()) {
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
       // console.log(newT);
        require("../API").addClient(newT, function (err, data) {
            if (data.error) console.log(data.error);
            else {
                //TODO: сделать вызов авторизации
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


sendMessage_My = function (i) {

        // document.getElementById("phone").mask('+380 (99) 999-99-99');
      // e.preventDefault();
       const {TelegramClient} = require('messaging-api-telegram');

// get accessToken from telegram [@BotFather](https://telegram.me/BotFather)
       const client = TelegramClient.connect('884221604:AAEVBWl5ETesASuZ0XjXZs3DBMG0YwovKZM');
//event.preventDefault();
    var name = $('#messageModal input[name=name]')[0].value;

    var phone = $('#messageModal input[name=phone]')[0].value;
    var text = $('#messageModal textarea[name=message]')[0].value;


       // model_message.style.display = "none";
       $('#messageModal').modal('toggle');
        let message = "Від " + name + "\n тел: " + phone + "\n" ;
       // let curr =  localStorage.getItem('currTechnic');
        if(i==1) message+="Стосовно: "+ document.getElementsByClassName("type_header")[0].innerText+"\n";
          message += text;
        console.log(message);
        client.sendMessage("-327577485", message, {
            disable_web_page_preview: true,
            disable_notification: false,
        });

    // console.log("fsdf");
}

openMessageModal = function () {
    $('#messageModal').modal('show');
   // $('#messageModal').on('shown.bs.modal', function(e) {

        var status = localStorage.getItem('status');
        //console.log("");
        var $modal = $(this);
        // esseyId = e.relatedTarget.id;

//            $.ajax({
//                cache: false,
//                type: 'POST',
//                url: 'backend.php',
//                data: 'EID='+essay_id,
//                success: function(data)
//                {

        if(status) {
            console.log("status is true");

            let name = localStorage.getItem("name");
            let surname = localStorage.getItem("surname");
            $("#username_messageForm").val(name+" "+ surname);
            $("#username_messageForm").attr("disabled", true);
            $("#phone_messageForm").val(localStorage.getItem("phone"));
            $("#phone_messageForm").attr("disabled", true);
            $("#message").val("");
        }
        else {
            $("#username_messageForm").val("");
            $("#phone_messageForm").val("");
            $("#message").val("");
        }

//                }
//            });

    //})
}
