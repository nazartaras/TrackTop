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
        require('./login_form').openForm();
    })

    $('.cancel').click(function() {
        require('./login_form').closeForm();
    })

    require('./signup_form').initializeLogin();
    require('./pagesScripts/typesOfTechnics').initializeTypes();

});