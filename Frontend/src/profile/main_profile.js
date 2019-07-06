$(function(){

    $('#logo').click(function () {
        document.location.href = "http://localhost:5050/";
    })



    $('#login').click(function() {
        require('./login_form').openForm();
    })

    $('.cancel').click(function() {
        require('./login_form').closeForm();
    })

    $('#user_photo').click(function() {
        require('./login_form').userInfo();
    })

    $('.edit-profile').click(function(){
        document.location.href = "http://localhost:5050/profile";
    })

    require('../basket').initialiseBasket();

    // added
    $('#exit_btn').click(function() {
        require('./user_form').deleteInfoFromLocalStorage();
        require('./user_form').isLogged();
        $('#user_info').css("display", "none");
    })

    $('#photo_input').change(function (event) {
        var image = document.getElementById('my_avatar');
        image.src = URL.createObjectURL(event.target.files[0]);
        require('../API').uploadUserPhoto(event.target.files[0],function(err,data){
            //TODO
        })
    })

    require('./signup_form').initializeLogin();
    require('./login_form').login();
    require('./user_form').isLogged();
    require('./profile').updateClient();



    require('./profile').initializeUser();



})