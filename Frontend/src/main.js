$(function(){
    //This code will execute when the page is ready
    // $('.testSql').click(function(){
    //
    //     var newT = {
    //         mark_id:1,
    //         type_id:1,
    //         amount:32,
    //         price:221,
    //         // model:'AD129'
    //     }
    //
    //     require("./API").addTehnic(newT,function (err,data) {
    //         if(data.error) console.log(data.error);
    //     });
    // });
    $('#logo').click(function () {
        document.location.href = "http://localhost:5050/";
    })

    require('./basket').initialiseBasket();

    $('#login').click(function() {
        require('./profile/login_form').openForm();
    })

    $('.cancel').click(function() {
        require('./profile/login_form').closeForm();
    })

    $('#user_photo').click(function() {
        require('./profile/login_form').userInfo();
    })

    $('.edit-profile').click(function(){
        document.location.href = "http://localhost:5050/profile";
    })

    // added
    $('#exit_btn').click(function() {
        require('./profile/user_form').deleteInfoFromLocalStorage();
        require('./profile/user_form').isLogged();
        $('#user_info').css("display", "none");
    })

    require('./profile/signup_form').initializeLogin();
    require('./pagesScripts/typesOfTechnics').initializeTypes();
    require('./pagesScripts/leftPanel').initialize();

    require('./profile/login_form').login();

    require('./profile/user_form').isLogged();

    require('./profile/profile').updateClient();
});