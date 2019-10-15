openAddTechnicModel = function () {
    $('#addTechnicModel').modal('show');
    $("#add-btn").text("Додати");
    // to do
    // get all types of technics, loop through and add options text = type, value=type

    // function callback(err,data) {
    //
    //     data.data.forEach(function(item){
    //         $('#type_technics').append(new Option(item.name, item.name));
    //     });
    //
    // }
    // require("../API").getTypes(callback);


    // get all marks, loop through
    // function callback(err,data) {
    //     data.data.forEach(function(item){
    //         $('#marks').append(new Option(item.name, item.name));
    //     });
    //
    // }
    // require("../API").getMarks(callback);

    // get all models

}

getModels = function() {
    let type = $('#type_technics').children("option:selected").val();
    let mark = $("#mark-choice").val();
    console.log("type="+type + "  mark = "+ mark);

    if(type!="" && mark!="") {

        // function callback(err, data) {
        //$('#models').children().remove();
        //     data.data.forEach(function (item) {
        //         $('#models').append(new Option(item.model, item.model));
        //     });
        // }
        //
        // require("../API").getModelsbyTypeMark(type, mark, callback);
        // not to use
       // $('#models').children().remove();
       // $('#models').append(new Option("consul", "consul"));
    }
}

openEditTechnicModal = function(cell) {
    $('#addTechnicModel').modal('show');
   // console.log(cell);
    var row = $(cell).parents("tr");
    var cols = row.children("td");
    var id  = $(cols[0]).text();
    console.log(id);
    //children("button")[0]).data("id");
    $("#type_technics").val($(cols[1]).text());
    $("#mark-choice").val($(cols[2]).text());
    $("#model-choice").val($(cols[3]).text());
    $("#price-input-technic").val($(cols[4]).text());
    // Change Update Button Text
    $("#add-btn").text("Оновити");
}

deleteTechnic = function(cell) {
    // check if we can delete
    var row = $(cell).parents("tr");
    var cols = row.children("td");
    var id  = $(cols[0]).text();
    console.log(id);
    var conf =confirm ("Ви впевнені, що хочете видалити?");
    if(conf) {
        // set attribute to "sold" or delete from db
        $(cell).parents("tr").remove();

        alert("Видалено");
    }

}

deleteEquipment = function(cell) {
    // check if we can delete
    var row = $(cell).parents("tr");
    var cols = row.children("td");
    var id  = $(cols[0]).text();
    console.log(id);
    var conf =confirm ("Ви впевнені, що хочете видалити?");
    if(conf) {
        // set attribute to "sold" or delete from db
        $(cell).parents("tr").remove();

        alert("Видалено");
    }

}

getMarks = function() {
    $('#mark-choice').prop("disabled", false);
}

openAddEquipmentModel = function () {
    $('#addEquipmentModel').modal('show');
    $("#add-btn").text("Додати");
    // to do
    // get all types of technics, loop through and add options text = type, value=type

    function callback(err,data) {

        data.data.forEach(function(item){
            console.log(item);
            // $('#type_technics').append(new Option(item.name, item.name));
        });

    }
    require("../API").getModels(callback);

    let marks = new Array(),all = new Array();
    let types = new Set(), models = new Array();
    let unique ;
    function callback(err,data) {
        console.log(data.data);
        all=data.data;
        data.data.forEach(function(item){
            types.add(item.technic_type);
            marks.push(item.technic_mark);
            models.push(item.model);
            //console.log(item);
            // $('#type_technics').append(new Option(item.name, item.name));
        });
    }
    require("../API").getModels(callback);

    for (let item of types)  $('#type_technics').append(new Option(item, item));

    let type =

 //   get all marks, loop through
    function callback(err,data) {
        data.data.forEach(function(item){
            $('#marks').append(new Option(item.name, item.name));
        });

    }
    require("../API").getModelsbyTypeMark(type,null,callback);

    // get all models
}

openEditEquipmentModal = function(cell) {
    $('#addEquipmentModel').modal('show');
    // console.log(cell);
    var row = $(cell).parents("tr");
    var cols = row.children("td");
    var id  = $(cols[0]).text();
    console.log(id);
    //children("button")[0]).data("id");
    $("#name-equipment").val($(cols[1]).text());
    $("#price-input").val($(cols[2]).text());
    $("#equipment-code").val($(cols[3]).text());
    $("#equipment-amount").val($(cols[4]).text());
    // Change Update Button Text
    $("#add-btn").text("Оновити");
}

$(function(){
    console.log( "window loaded" );

    for(var i=0;i<100;i++) {
        $("#allTechnics tbody").append(
            "<tr class='rowTechnic'>" +
            "<td class=\"id\">"+i+"</td>" +
            "<td class=\"type\">"+"Комбайн"+"</td>" +
            " <td class=\"mark\">"+"claas"+"</td>" +
            " <td class=\"model\">"+"mercator 50"+"</td>" +
            " <td class=\"price\">"+"9000"+"</td>" +
            " <td class=\"edit-btn\"><button class=\"btn btn-secondary\" onclick='openEditTechnicModal(this)'><i class=\"fa fa-edit\"></i></button></td>" +
            "<td class=\"delete-btn\"><button class=\"btn btn-secondary\" onclick='deleteTechnic(this)'><i class=\"fa fa-remove\"></i></button></td>" +
            "</tr>"
        );
    }
    //alert( "ready!" );
    function callback(err,data) {
       console.log(data);
        console.log(err);
       console.log(data.data);
        data.data.forEach(function(item){
           console.log(1);
        });

    }
    require("../API").getTechnics(callback);
});

$(function(){
    console.log( "window loaded" );

    for(var i=0;i<100;i++) {
        $("#allEquipments tbody").append(
            "<tr class='rowEquipment'>" +
            "<td class=\"id\">"+i+"</td>" +
            "<td class=\"name\">"+"Комбайн"+"</td>" +
            " <td class=\"price\">"+"45"+"</td>" +
            " <td class=\"code\">"+"KM342342i"+"</td>" +
            " <td class=\"amount\">"+"9000"+"</td>" +
            " <td class=\"edit-btn\"><button class=\"btn btn-secondary\" onclick='openEditEquipmentModal(this)'><i class=\"fa fa-edit\"></i></button></td>" +
            "<td class=\"delete-btn\"><button class=\"btn btn-secondary\" onclick='deleteEquipment(this)'><i class=\"fa fa-remove\"></i></button></td>" +
            "</tr>"
        );
    }
    //alert( "ready!" );
    function callback(err,data) {
        console.log(data);
        console.log(err);
        console.log(data.data);
        data.data.forEach(function(item){
            console.log(1);
        });

    }
    require("../API").getTechnics(callback);
});

function productBuildTableRow(id) {
    var ret =
        "<tr class='rowEquipment'>" +
        "<td class=\"id\">"+id+"</td>" +
        "<td class=\"name\">"+"Комбайн"+"</td>" +
        " <td class=\"price\">"+"45"+"</td>" +
        " <td class=\"code\">"+"KM342342i"+"</td>" +
        " <td class=\"amount\">"+"9000"+"</td>" +
        " <td class=\"edit-btn\"><button class=\"btn btn-secondary\" onclick='openEditEquipmentModal(this)'><i class=\"fa fa-edit\"></i></button></td>" +
        "<td class=\"delete-btn\"><button class=\"btn btn-secondary\" onclick='deleteEquipment(this)'><i class=\"fa fa-remove\"></i></button></td>" +
        "</tr>";

    return ret;
}

function filterSelection(nameRow) {
    var input =  document.getElementsByClassName("search")[0];
    filter = input.value.toUpperCase();
    var list;
    let count = 0;
    if(nameRow==1) nameRow="rowTechnic";
    if(nameRow==2) nameRow="rowEquipment";
    list = document.getElementsByClassName(nameRow);
    // console.log(list);
    for(let i =0 ; i< list.length;i++) {
        // let a = list[i].getElementsByClassName();
        var txtValue;
        txtValue = list[i].innerText;
        console.log(txtValue);
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
            count++;
        }

    }

}

addTechnicToDB = function () {
    var selectedType = $('#type_technics').children("option:selected").val();
    var mark = $("#mark-choice").val();
    var model = $("#model-choice").val();
    var price = $("input[type=number][name=price-input]").val();
    var currency = $('#currency-choice').children("option:selected").val();
    var year = $("input[type=number][name=year-input]").val();
    var description = $("textarea[name=description]").val();
    console.log(selectedType);
    console.log(mark);
    console.log(model);
    console.log(price);
    console.log(currency);
    console.log(year);
    console.log(description);
    let technic = {
        mark_id : null,
        type_id : null,
        model : model,
        amount : 1,
        price : price,
        production_date : year,
        currency:"долар",
        description:description
    }
    if(currency=='грн') technic.currency="гривня";
    if(currency=='€') technic.currency="євро";
   // if(currency=='грн') technic.currency="гривня";

    function callback1(err,data) {

        if(data.error) console.log(data.error);
        else {
            technic.type_id= (data.data[0].id);
            function callback2(err,data) {
                if(data.error) console.log(data.error);
                if(data.data.length <1) {
                    function callback4(err,data) {
                       // console.log(data.data.insertId);
                        technic.mark_id= data.data.insertId;
                        function callback(err,data) {
                            if(data.error) console.log(data.error);
                            else console.log("success");
                        }
                        require("../API").addTehnic(technic,callback);
                    }
                    require("../API").addMarkTechnic({name : mark},callback4);
                }
                else {
                    technic.mark_id = data.data[0].id;

                    function callback(err,data) {
                        if(data.error) console.log(data.error);
                        else console.log("success");
                    }
                    require("../API").addTehnic(technic,callback);
                }
            }
            require("../API").getId("marks_of_technics",mark, callback2);
        }
    }
    require("../API").getId("types_of_technics",selectedType, callback1);
}

addEquipmentToDB = function () {
    var name = $('#name-equipment').val();
    var code = $("#equipment-code").val();
    var price = $("input[type=number][name=price-input]").val();
    var currency = $('#currency-choice').children("option:selected").val();
    var state = $('#state-choice').children("option:selected").val();
    var amount = $("#equipment-amount").val();
    var description = $("textarea[name=description]").val();
    var selectedType = $('#type_technics').children("option:selected").val();
    var mark = $("#mark-choice").val();
    var model = $("#model-choice").val();
    console.log(name);
    console.log(code);
    console.log(price);
    console.log(currency);
    console.log(state);
    console.log(description);
    console.log(amount);
    $("#allEquipments tbody").append(
        productBuildTableRow(102));
}