function  initialize() {
    var equipment = JSON.parse(localStorage.getItem('currTechnic'));
    var dataset = [];

    function callback(err,data) {
        if(data.error) console.log(data.error);
        data.data.forEach(function(item){
            dataset.push(item.file_name)
        });
        require('../pagesScripts/slider').initialize(dataset);
    }
    require('../API').getEquipmentImagesById(equipment.id,callback);


    $('.order_technic').click(function(){

        // var tech = JSON.parse(localStorage.getItem('currTechnic'));

        var equipment = localStorage.getItem('currEquipment');
        console.log(equipment);
        // var isTech = equipment==null ? false : true;
        require('../basket').addToCart({
            id : equipment.id,
            title: equipment.name,
            price: equipment.price,
            currency: equipment.currency,
            icon: equipment.main_photo_location,
            quantity: equipment.amount,
            isTech : false
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