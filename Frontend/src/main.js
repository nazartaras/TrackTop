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

    function openNav() {
        $("#basketColumn").addClass("widthR");
        $("#main").addClass("margR");
        $(".header").addClass("margR");
    }

    function closeNav() {
        $("#basketColumn").removeClass("widthR");
        $("#main").removeClass("margR");
        $(".header").removeClass("margR");
    }

    $('.basketBtn').click(function () {
        openNav();
    })

    $('.basketCloseBtn').click(function () {
        closeNav();
    })

    var l = [
        {
            image: 'assets/images/трактор.jpg',
            name: 'Трактори'
        },
        {
            image: 'assets/images/трактор.jpg',
            name: 'Трактори'
        },
        {
            image: 'assets/images/трактор.jpg',
            name: 'Трактори'
        },
        {
            image: 'assets/images/трактор.jpg',
            name: 'Трактори'
        },
    ]


    require('./pagesScripts/typesOfTechnics').showTypes(l);

});