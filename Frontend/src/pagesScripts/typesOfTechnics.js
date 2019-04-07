var Templates = require('../Templates');

var $types =   $('.typesOfTechnic');


function showTypes(list) {

    $types.html("");

    function showOne(type) {
        var html_code = Templates.typeOfTechnic({type: type});

        var $node = $(html_code);

        $types.append($node);
    }

    list.forEach(showOne);
}

exports.initializeTypes = function(){
    // var l = [
    //     {
    //         image: 'http://localhost:5050/images/technics_placeholders/tracktor.jpg',
    //         name: 'Трактори'
    //     },
    //     {
    //         image: 'http://localhost:5050/images/technics_placeholders/sivalka.jpg',
    //         name: 'Сівалки'
    //     },
    //     {
    //         image: 'http://localhost:5050/images/technics_placeholders/combine.jpg',
    //         name: 'Комбайни'
    //     },
    //     {
    //         image: 'http://localhost:5050/images/technics_placeholders/dyskova.jpg',
    //         name: 'Дискова'
    //     },
    //     {
    //         image: 'http://localhost:5050/images/technics_placeholders/equipment.jpg',//'http://localhost:5050/images/photo1.jpg'
    //         name: 'Запчастини'
    //     },
    // ]
    var l=[];

    require("../API").getTypes(function (err,data) {
        if(data.error) console.log(data.error);
        data.data.forEach(function(item){
            l.push(item)
        });
        l.push( {
            photo_location: 'equipment.jpg',//'http://localhost:5050/images/photo1.jpg'
            name: 'Запчастини'
        });
        showTypes(l);
    });
}