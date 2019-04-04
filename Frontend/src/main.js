$(function(){
    //This code will execute when the page is ready
    $('.testSql').click(function(){

        var newT = {
            mark_id:1,
            type_id:1,
            amount:32,
            price:221,
            model:'AD129'
        }

        require("./API").addTehnic(newT,function () {
            
        });
    });


});