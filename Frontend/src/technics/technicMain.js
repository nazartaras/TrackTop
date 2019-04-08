function  initialize() {
    var slider = require('../pagesScripts/slider').multiItemSlider('.slider');

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

    require('../signup_form').initializeLogin();
    require('../pagesScripts/leftPanel').initialize();

    initialize();
});