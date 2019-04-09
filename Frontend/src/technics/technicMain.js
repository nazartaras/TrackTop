function  initialize() {

    require('../pagesScripts/slider').initialize();

    $('.order_technic').click(function(){
        var tech = JSON.parse(localStorage.getItem('currTechnic'));
        require('../basket').addToCart({
            title: tech.mark+' '+tech.model,
            price: tech.price,
            currency: tech.currency,
            icon: tech.main_photo_location,
            quantity: 1
        });
    })
}

$(function(){
    $('#logo').click(function () {
        document.location.href = "http://localhost:5050/";
    })

    require('../basket').initialiseBasket();

    $('#login').click(function() {
        require('../login_form').openForm();
    })

    $('.cancel').click(function() {
        require('../login_form').closeForm();
    })

    $('#user_photo').click(function() {
        require('../login_form').userInfo();
    })

    $('#exit_btn').click(function() {
        require('../user_form').deleteInfoFromLocalStorage();
        require('../user_form').isLogged();
        $('#user_info').css("display", "none");
    })


    require('../signup_form').initializeLogin();
    require('../pagesScripts/leftPanel').initialize();


    require('../login_form').login();

    require('../user_form').isLogged();
    initialize();

    $('.edit-profile').click(function(){
        document.location.href = "http://localhost:5050/profile";
    })
});