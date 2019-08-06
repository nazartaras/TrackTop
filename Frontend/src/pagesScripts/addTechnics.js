var Templates = require('../Templates');

var $technics   =   $('.technics');
var $equipments =   $('.equipments');


function showTechnics(list) {

    $technics.html("");
    if(list.length===0) {
        $technics.append("Нічого не знайдено");
        return;
    }
    function showOne(type) {
        var html_code = Templates.technicInList({technic: type});
        var $node = $(html_code);

        var model = $node.find('.model_').html();
        var mark = $node.find('.mark_').html();
        var typ = localStorage.getItem('currentTypeOfTechnics');

        var s = type.type_name;

        console.log("s = "+ s );
       // var typ = $node.find('.type_h2').html();
//console.log(typ);
        console.log("model:" + model+ " mark = "+ mark + "type  = " + typ);

        $node.click(function () {
            console.log("type"+ type);
            //
            localStorage.setItem('currentTypeOfTechnics', type.type_name);
            ///
            localStorage.setItem('currTechnic',JSON.stringify({
                id: type.id,
                model: type.model,
                mark: type.name,
                main_photo_location: type.main_photo_location,
                price: type.price,
                currency: type.currency,
                amount: type.amount,
                description: type.description
            }));
            document.location.href = "http://localhost:5050/technic?model="+model+"&mark="+mark+'&type='+type.type_name;
        });

        $technics.append($node);
    }

    list.forEach(showOne);
}

exports.initializeTechnics = function(){

    var l=[];

    var tp = localStorage.getItem('currentTypeOfTechnics');
    var mrk = localStorage.getItem('currentMarkOfTechnics');

    function callback(err,data) {
        if(data.error) console.log(data.error);
        data.data.forEach(function(item){
            l.push(item)
        });
        showTechnics(l);
    }

    if(tp==null) {
        console.log("tp == null");
        require("../API").getTechnics(callback);
    }
    else {
        if (/type=([^&]+)/.exec(document.location.href)) {
            require("../API").getTechnicsByType({type: tp}, callback);
            console.log("type");
        }
        else {
            require("../API").getTechnicsByType({mark: mrk}, callback);
            console.log("mark");
        }
    }
}

function showEquipments(list) {

    $equipments.html("");
    if(list.length===0) {
        $equipments.append("Нічого не знайдено");
        //TODO: templ for empty result
        return;
    }
    function showOne(type) {
        var html_code = Templates.equipmentInList({equipment: type});
        var $node = $(html_code);

        var typ = localStorage.getItem('currentTypeOfTechnics');

        $node.click(function () {
            document.location.href = "http://localhost:5050/equipments?name="+type.name;
        });

        $equipments.append($node);
    }

    list.forEach(showOne);
}

exports.initializeEquipments = function(){
    var l=[];

    function callback(err,data) {
        if(data.error) console.log(data.error);
        data.data.forEach(function(item){
            l.push(item)
        });
        showEquipments(l);
    }

    require("../API").getEquipments(callback);
}