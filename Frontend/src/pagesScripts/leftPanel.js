var Templates = require('../Templates');

var $technics =   $('.vertical-menu-technics');
var $models =   $('.vertical-menu-models');
var $equipment =   $('.vertical-menu-equipment');


function showTechnics(list) {

    $technics.html("");
    $technics.append('<a href="#" class="active">Техніка</a>');

    function showOne(t) {
        var html_code = Templates.technicInMenu({item: t});

        var $node = $(html_code);

        var typ = $node.html();

        $node.click(function () {
            localStorage.setItem('currentTypeOfTechnics', typ);
            document.location.href = "http://tracktop.com.ua:5050/technics?type="+typ;
        })

        $technics.append($node);
    }

    list.forEach(showOne);
}

function showMarks(list) {

    $models.html("");
    $models.append('<a href="#" class="active">Моделі</a>');

    function showOne(t) {
        var html_code = Templates.technicInMenu({item: t});

        var $node = $(html_code);

        var mark = $node.html();
        $node.click(function () {
            localStorage.setItem('currentMarkOfTechnics', mark);
            document.location.href = "http://tracktop.com.ua:5050/technics?mark="+mark;
        })

        $models.append($node);
    }

    list.forEach(showOne);
}

exports.initialize = function(){

    var tp = localStorage.getItem('currentTypeOfTechnics');

    function callback(err,data) {
        if(data.error) console.log(data.error);
        var l=[];
        data.data.forEach(function(item){
            l.push(item)
        });
        showTechnics(l);
    }
    function callback2(err,data) {
        if(data.error) console.log(data.error);
        var l=[];
        data.data.forEach(function(item){
            l.push(item)
        });
        showMarks(l);
    }

    require("../API").getTypes(callback);
    require("../API").getMarks(callback2);

    $equipment.click(function(){
        document.location.href = "http://tracktop.com.ua:5050/equipments";
    })
}