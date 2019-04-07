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
    require('./basket').initialiseBasket();

    $('#login').click(function() {
        require('./login_form').openForm();
    })

    $('.cancel').click(function() {
        require('./login_form').closeForm();
    })

    var l = [
        {
            image: 'assets/images/трактор.jpg',
            name: 'Трактори'
        },
        {
            image: 'assets/images/трактор.jpg',
            name: 'Сівалки'
        },
        {
            image: 'assets/images/трактор.jpg',
            name: 'Комбайни'
        },
        {
            image: 'assets/images/трактор.jpg',
            name: 'Інше'
        },
        {
            image: 'assets/images/трактор.jpg',//'http://localhost:5050/images/photo1.jpg'
            name: 'Запчастини'
        },
    ]

    require('./signup_form').initializeLogin();

    require('./pagesScripts/typesOfTechnics').showTypes(l);

});