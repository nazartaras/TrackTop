var values = require('../values.js');
var API_URL = values.url;

function  initialize() {
    var tech = JSON.parse(localStorage.getItem('currTechnic'));
    var dataset = [];
    function callback(err,data) {
        if(data.error) console.log(data.error);
        data.data.forEach(function(item){
            dataset.push(item.file_name)
        });
        require('../pagesScripts/slider').initialize(dataset);
    }
    require('../API').getTechnicsImagesById(tech.id,callback);

    $('.order_technic').click(function(){

        // var equipment = localStorage.getItem('currEquipment');
        // console.log(equipment);
        // var isTech = equipment==null ? false : true;

        var tech = JSON.parse(localStorage.getItem('currTechnic'));
        require('../pagesScripts/notify').Notify("Товар додано.Перейдіть в корзину, щоб оформити замовлення!!!",null,null,'success');

        require('../basket').addToCart({
            id : tech.id,
            title: tech.mark+' '+tech.model,
            price: tech.price,
            currency: tech.currency,
            icon: tech.main_photo_location,
            quantity: tech.amount,
            isTech : true
        });

       // Notify("Товар додано.Перейдіть в корзину, щоб оформити замовлення!!!")
    })
}

$(function(){
    $('#logo').click(function () {
        document.location.href = API_URL;
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
        document.location.href = API_URL+"/profile";
    })
});