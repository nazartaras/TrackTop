function  initialize() {

    require('../pagesScripts/slider').initialize();

    $('.order_technic').click(function(){
        var tech = JSON.parse(localStorage.getItem('currTechnic'));
        require('../basket').addToCart({
            title: tech.mark+' '+tech.model,
            price: tech.price,
            currency: tech.currency,
            icon: tech.main_photo_location,
            quantity: tech.amount
        });
    })
}

$(function(){
    $('#logo').click(function () {
        document.location.href = "http://localhost:5050/";
    })

    require('../basket').initialiseBasket();

    $('#login').click(function() {
        require('../profile/login_form').openForm();
    })

    $('.cancel').click(function() {
        require('../profile/login_form').closeForm();
    })

    $('#user_photo').click(function() {
        require('../profile/login_form').userInfo();
    })

    $('#exit_btn').click(function() {
        require('../profile/user_form').deleteInfoFromLocalStorage();
        require('../profile/user_form').isLogged();
        $('#user_info').css("display", "none");
    })


    require('../profile/signup_form').initializeLogin();
    require('../pagesScripts/leftPanel').initialize();


    require('../profile/login_form').login();

    require('../profile/user_form').isLogged();
    initialize();

    $('.edit-profile').click(function(){
        document.location.href = "http://localhost:5050/profile";
    })
});