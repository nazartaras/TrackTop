var Templates = require('../Templates');

var $technics =   $('.technics');


function showTechnics(list) {

    $technics.html("");

    function showOne(type) {
        var html_code = Templates.technicInList({technic: type});

        var $node = $(html_code);

        var model = $node.find('.model_').html();
        var mark = $node.find('.mark_').html();
        var typ = localStorage.getItem('currentTypeOfTechnics');

        $node.click(function () {
            // localStorage.setItem('', typ);
            localStorage.setItem('currTechnic',JSON.stringify({
                model:type.model,
                mark: type.name,
                main_photo_location: type.main_photo_location,
                price: type.price,
                currency: type.currency,
                amount: type.amount,
                description: type.description
            }));
            document.location.href = "http://localhost:5050/technic?model="+model+"&mark="+mark+'&type='+typ;
        });

        $technics.append($node);
    }

    list.forEach(showOne);
}

exports.initializeTechnics = function(){

    var l=[];

    var tp = localStorage.getItem('currentTypeOfTechnics');

    function callback(err,data) {
        if(data.error) console.log(data.error);
        data.data.forEach(function(item){
            l.push(item)
        });
        showTechnics(l);
    }

    if(tp==null)
        require("../API").getTechnics(callback);
    else
        require("../API").getTechnicsByType({type: tp},callback);
}