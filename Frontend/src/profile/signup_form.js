var modal = document.getElementById('id01');
var model_message = document.getElementById('messageModal');
function openSignUpForm() {
    modal.style.display='block';
}

exports.initializeLogin = function(){
    $('#signup').click(function() {
        $('#myForm').css("display", "none");
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

checkMessageForm = function () {
    var $name = $('#messageModal input[name=name]')[0];
    var $phone = $('#messageModal input[name=phone]')[0];
    var $message = $('#messageModal textarea[name=message]')[0];
   // var $address = $('#messageModal input[name=location]')[0];

        var name = $name.value;
        var phone = $phone.value;
        var message = $message.value;
       // var address = $address.value;

        if (name == "")
        {
            window.alert("Введіть ім'я");
           // name.focus();
            return false;
        }

        if (message == "")
        {
            window.alert("Введіть повідомлення");
           // message.focus();
            return false;
        }

    if (phone == "")
    {
        window.alert("Введіть телефон");
       // phone.focus();
        return false;
    }

    var phoneno = ///^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if(!phoneno.test(phone)) {
        alert("Введіть дісний номер\n" +
            "Приклад 093-345-3456");
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
    if(checkMessageForm()) {


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
        let message = "Від " + name + "\n тел: " + phone + "\n";
        // let curr =  localStorage.getItem('currTechnic');
        if (document.getElementsByClassName("type_header").length!=0) message += "Стосовно: " + document.getElementsByClassName("type_header")[0].innerText + "\n";
        message += text;
        console.log(message);
        client.sendMessage("-327577485", message, {
            disable_web_page_preview: true,
            disable_notification: false,
        });
        Notify("Повідомлення відправлено!!!",null,null,'success');
        // console.log("fsdf");
         }
}

openMessageModal = function () {
    // let technic = {
    //     mark_id : null,
    //     type_id : null,
    //     model : "model",
    //     amount : 1,
    //     price : "3123",
    //     production_date : "1986",
    //     currency:"долар",
    //     description:"fsdf"
    // }
    //
    // function callback1(err,data) {
    //     console.log(data);
    //     console.log(data.data);
    //     if(data.error) console.log(data.error);
    //     else {
    //         technic.type_id= (data.data[0].id);
    //         function callback2(err,data) {
    //             if(data.error) console.log(data.error);
    //             if(data.data.length <1) {
    //                 function callback4(err,data) {
    //                     console.log(data.data.insertId);
    //                     technic.mark_id= data.data.insertId;
    //                     function callback(err,data) {
    //                         if(data.error) console.log(data.error);
    //                         else console.log("success");
    //                     }
    //                     require("../API").addTehnic(technic,callback);
    //                 }
    //                 require("../API").addMarkTechnic({name : "fsd"},callback4);
    //             }
    //             else {
    //                 technic.mark_id = data.data[0].id;
    //                 function callback(err,data) {
    //                     if(data.error) console.log(data.error);
    //                     else console.log("success");
    //                 }
    //                 require("../API").addTehnic(technic,callback);
    //             }
    //         }
    //         require("../API").getId("marks_of_technics","ffg", callback2);
    //     }
    // }
    // require("../API").getId("types_of_technics","Трактори", callback1);

//
//     let marks = new Array(),all = new Array();
//     let types = new Set(), models = new Array();
//     let unique ;
//     function callback(err,data) {
// console.log(data.data);
//         all=data.data;
//         data.data.forEach(function(item){
//             types.add(item.technic_type);
//             marks.push(item.technic_mark);
//             models.push(item.model);
//             console.log(item);
//             // $('#type_technics').append(new Option(item.name, item.name));
//         });
//     }
//     require("../API").getModels(callback);
// console.log(types);

    $('#messageModal').modal('show');
   // $('#messageModal').on('shown.bs.modal', function(e) {
    $('#user_info').css("display", "none");
    $('#myForm').css("display", "none");
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
           // $("#username_messageForm").val("");
           // $("#phone_messageForm").val("");
            $("#message").val("");
        }

//                }
//            });

    //})
}

Notify = function(text, callback, close_callback, style) {

    var time = '20000';
    var $container = $('#notifications');
    var icon = '<i class="fa fa-info-circle "></i>';

    if (typeof style == 'undefined' ) style = 'warning'

    var html = $('<div class="alert alert-' + style + '  hide">' + icon +  " " + text + '</div>');

    $('<a>',{
        text: '×',
        class: 'button close',
        style: 'padding-left: 10px;',
        href: '#',
        click: function(e){
            e.preventDefault()
            close_callback && close_callback()
            remove_notice()
        }
    }).prependTo(html)

    $container.prepend(html)
    html.removeClass('hide').hide().fadeIn('slow')

    function remove_notice() {
        html.stop().fadeOut('slow').remove()
    }

    var timer =  setInterval(remove_notice, time);

    $(html).hover(function(){
        clearInterval(timer);
    }, function(){
        timer = setInterval(remove_notice, time);
    });

    html.on('click', function () {
        clearInterval(timer)
        callback && callback()
        remove_notice()
    });


}
