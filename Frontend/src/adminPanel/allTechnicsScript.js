var multipleEquipmentOpen = false;
var container_num = 1;

var values = require('../values.js');
var API_URL = values.url;
var file_uploader = require('blueimp-file-upload');

//multiple = new MultipleSelect();
openAddTechnicModel = function () {

    document.getElementById('addTechnicModel').style.display='block';
    // $('#addTechnicModel').style.display='block';
    $("#add-btn").text("Додати");

    technicFormClear();
    // todo:
    // get all types of technics, loop through and add options text = type, value=type
    $('#type_technics').children().remove();
    $('#marks').children().remove();
    $('#type_technics').append('<option selected value="Тип" disabled>Тип</option>');
    function callback(err,data) {

        data.data.forEach(function(item){
            //console.log("type = "+ item);
            $('#type_technics').append(new Option(item.name, item.name));
        });

    }
    require("../API").getTypes(callback);


    // get all marks, loop through
    function callback2(err,data) {
        data.data.forEach(function(item){
            //console.log("mark = " + item);
            $('#marks').append(new Option(item.name, item.name));
        });

    }
    require("../API").getMarks(callback2);


}

getModels = function() {
    let type = $('#type_technics').children("option:selected").val();
    if($('#mark-choice').prop('disabled')) {
        $('#mark-choice').prop("disabled", false);
    }
    else if ($('#mark-choice').val()!=""){
        $('#model-choice').prop("disabled", false);
        let mark = $("#mark-choice").val();
        console.log("type=" + type + "  mark = " + mark);

        if (type != "" && mark != "") {

            function callback(err, data) {
            $('#models').children().remove();
                data.data.forEach(function (item) {
                    $('#models').append(new Option(item.model, item.model));
                });
            }

            require("../API").getModelsbyTypeMark(type, mark, callback);
            // not to use
            // $('#models').children().remove();
            // $('#models').append(new Option("consul", "consul"));
        }
    }
}

openEditTechnicModal = function(cell) {
    $('#addTechnicModel').modal('show');
   // console.log(cell);
    var row = $(cell).parents("tr");
    var cols = row.children("td");
    var id  = $(cols[0]).text();
    //console.log(id);
    var s = $(cols[1]).text();
    //children("button")[0]).data("id");
    //$("#type_technics").val($(cols[1]).text());
    $("#type_technics").append(new Option(s, s,true,true));
    $('#type_technics').prop("disabled", true);
    $("#mark-choice").val($(cols[2]).text());
    $("#model-choice").val($(cols[3]).text());
    $("#mark-choice").prop("disabled", true);
    $("#model-choice").prop("disabled", true);
    $("#price-input-technic").val($(cols[4]).text());

    function callback(err,data) {
        if (err) {
            console.log(err);
        }
        else {
            $("#description").val(data.data[0].description);
            $("#year-technic-input").val(data.data[0].production_date);
            let cur = data.data[0].currency;
            if(cur == "долар")  $("#currency-choice").val("$");
            if(cur == "євро")  $("#currency-choice").val("€");
            if(cur == "гривня")  $("#currency-choice").val("грн");
        }
    }
    require("../API").getTechnicsById(id,callback);
    function callback1(err,data) {
        if (err) {
            console.log(err);
        }
        else {
            data.data.forEach(function(item){
               // ..todo  add photos to modal
            });
        }
    }
    require("../API").getTechnicsImagesById(id,callback1);
    // Change Update Button Text
    $("#add-btn").text("Оновити");

}

deleteTechnic = function(cell) {
    // check if we can delete
    var row = $(cell).parents("tr");
    var cols = row.children("td");
    var id  = $(cols[0]).text();
    //console.log(id);
    var conf =confirm ("Ви впевнені, що хочете видалити?");
    if(conf) {
        // set attribute to "sold" or delete from db
        function callback(err,data) {
            if( err) {
                Notify("Помилка! Не вдалось видалити.",null,null,'success');
            }
            else {
                $(cell).parents("tr").remove();
            }
        }
        require("../API").deleteTechnicsByID(id,callback)
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
        function callback2(err,data) {
            if( err) {
                //Notify("Помилка! Не вдалось видалити.",null,null,'success');
            }
            else {
                function callback(err,data) {
                    if(err) console.log.err;
                    else {
                        $(cell).parents("tr").remove();
                    }
                }
                require("../API").deleteEquipmentsByID(id,callback)

            }
        }
        require("../API").deleteEquipmentsModelsByID(id,callback2)


    }

}

getMarks = function() {
    let selectedType = $('#type_technics').children("option:selected").val();
    //console.log(selectedType);
    $('#mark-choice').prop("disabled", false);
    $('#mark-choice').children().remove();
    $('#mark-choice').append('<option selected value="Марка" disabled>Марка</option>');
    function callback(err,data) {
        if(err) console.log(err);
         else {
             //console.log(data);
            data.data.forEach(function (item) {
                if (! $('#mark-choice').find("option[value='" + item.technic_mark + "']").length)
                $('#mark-choice').append(new Option(item.technic_mark, item.technic_mark));
                //console.log(item.technic_mark);
                // if(!marks.includes(item.technic_mark)) {
                //     marks.push(item.technic_mark);
                //     //console.log(item.technic_mark);
                //     $('#marks').append(new Option(item.technic_mark, item.technic_mark));
                // }
            });
        }
    }
    require("../API").getModelsbyTypeMark(selectedType,null,callback);
}

//multiple-select-container-1

showModels = function() {
    let selectedType = $('#type_technics').children("option:selected").val();
    let selectedMark = $('#mark-choice').val();
    $('#model-choice').prop("disabled", false);
    //let multipleSelect =

    if(multipleEquipmentOpen) {
        $('#model-choice').children().remove();
        console.log(container_num);
        $('#multiple-select-container-'+container_num).remove();
        container_num++;
    }
    function callback(err,data) {
        if(err) console.log(err);
        else {
            //console.log(data);
            data.data.forEach(function (item) {
                if (! $('#model-choice').find("option[value='" + item.model + "']").length)
                      $('#model-choice').append(new Option(item.model, item.model));
                    //console.log(item.model);
            });
            $('#model-choice').prop("multiple", true);
            if(!multipleEquipmentOpen) {
                multipleEquipmentOpen = true;
            }
            new MultipleSelect('#model-choice');
        }
    }
    require("../API").getModelsbyTypeMark(selectedType,selectedMark,callback);
}

openAddEquipmentModel = function () {
    document.getElementById('addEquipmentModel').style.display='block';
    // $('#addEquipmentModel').modal('show');
    $("#add-btn").text("Додати");
    // $('#multiple-select-container-'+container_num).css("display", "none");
    equipmentFormClear();

    $('#type_technics').children().remove();
    $('#type_technics').append('<option selected value="Тип" disabled>Тип</option>');
    function callback1(err,data) {
        if (err) console.log(err);
        data.data.forEach(function(item){
            if (! $('#type_technics').find("option[value='" + item.technic_type + "']").length)
            $('#type_technics').append(new Option(item.technic_type, item.technic_type));
        });
    }
    require("../API").getModels(callback1);
    // to do
    // get all types of technics, loop through and add options text = type, value=type

}

openEditEquipmentModal = function(cell) {
    $('#addEquipmentModel').modal('show');
    // console.log(cell);
    var row = $(cell).parents("tr");
    var cols = row.children("td");
    var id  = $(cols[0]).text();
    console.log(id);
    localStorage.setItem("currEquipmentId",id);
    //children("button")[0]).data("id");
    $("#name-equipment").val($(cols[1]).text());
    $("#price-input").val($(cols[2]).text());
    $("#equipment-code").val($(cols[3]).text());
    $("#equipment-amount").val($(cols[4]).text());
    $('#model-choice').children().remove();
    $('#multiple-select-container-'+(container_num-1)).remove();
    $('#multiple-select-container-'+(container_num)).remove();

    function callback1(err,data) {
        if(err) console.log(err);
        data.data.forEach(function(item){
            if (! $('#type_technics').find("option[value='" + item.technic_type + "']").length)
                $('#type_technics').append(new Option(item.technic_type, item.technic_type));
        });
    }
    require("../API").getModels(callback1);

    function callback(err,data) {
        if (err) {
            console.log(err);
        }
        else {
            //стан валюта
            $("#description").val(data.data[0].description);
            $("#state-choice").val(data.data[0].state);
            let cur = data.data[0].currency;
            if(cur == "долар")  $("#currency-choice").val("$");
            if(cur == "євро")  $("#currency-choice").val("€");
            if(cur == "гривня")  $("#currency-choice").val("грн");
            $("#type_technics").val(data.data[0].technic_type);
            $('#mark-choice').prop("disabled", false);
            $('#model-choice').prop("disabled", false);

            $("#mark-choice").append(new Option(data.data[0].technic_mark, data.data[0].technic_mark,true,true));
            let models_selected = [] ;
            data.data.forEach(function (item) {
                models_selected.push(item.model);
            })
            function callback3(err, data3) {
                if (err) {
                    console.log(err);
                }
                $('#model-choice').prop("multiple",true);
                data3.data.forEach(function (item3) {
                    if(models_selected.includes(item3.model)) {
                        $('#model-choice').append(new Option(item3.model, item3.model,true,true));
                        console.log("contains");
                    }

                    else {
                        $('#model-choice').append(new Option(item3.model, item3.model,false,true));
                        console.log("not contains");
                    }
                });
                new MultipleSelect('#model-choice');
                console.log(container_num);
                multipleEquipmentOpen = true;
                container_num++;
            }

            require("../API").getModelsbyTypeMark(data.data[0].technic_type, data.data[0].technic_mark, callback3);
        }
    }
    require("../API").getEquipmentsById(id,callback);
    // Change Update Button Text
    $("#add-btn").text("Оновити");

}

$(function(){
    //
    // for(var i=0;i<100;i++) {
    //     $("#allTechnics tbody").append(
    //         "<tr class='rowTechnic'>" +
    //         "<td class=\"id\">"+i+"</td>" +
    //         "<td class=\"type\">"+"Комбайни"+"</td>" +
    //         " <td class=\"mark\">"+"claas"+"</td>" +
    //         " <td class=\"model\">"+"mercator 50"+"</td>" +
    //         " <td class=\"price\">"+"9000"+"</td>" +
    //         " <td class=\"edit-btn\"><button class=\"btn btn-secondary\" onclick='openEditTechnicModal(this)'><i class=\"fa fa-edit\"></i></button></td>" +
    //         "<td class=\"delete-btn\"><button class=\"btn btn-secondary\" onclick='deleteTechnic(this)'><i class=\"fa fa-remove\"></i></button></td>" +
    //         "</tr>"
    //     );
    // }
    //alert( "ready!" );
    function callback(err,data) {
        data.data.forEach(function(item){
            $("#allTechnics tbody").append(
                "<tr class='rowTechnic'>" +
                "<td class=\"id\">"+item.id+"</td>" +
                "<td class=\"type\">"+item.types_of_technics_name+"</td>" +
                " <td class=\"mark\">"+item.marks_of_technics_name+"</td>" +
                " <td class=\"model\">"+item.model+"</td>" +
                " <td class=\"price\">"+item.price+"</td>" +
                " <td class=\"edit-btn\"><button class=\"btn btn-secondary\" onclick='openEditTechnicModal(this)'><i class=\"fa fa-edit\"></i></button></td>" +
                "<td class=\"delete-btn\"><button class=\"btn btn-secondary\" onclick='deleteTechnic(this)'><i class=\"fa fa-remove\"></i></button></td>" +
                "</tr>"
            );
        });

    }
    require("../API").getTechnics(callback);
});

$(function(){
    console.log( "window loaded" );

    // for(var i=0;i<100;i++) {
    //     $("#allEquipments tbody").append(
    //         "<tr class='rowEquipment'>" +
    //         "<td class=\"id\">"+i+"</td>" +
    //         "<td class=\"name\">"+"Комбайн"+"</td>" +
    //         " <td class=\"price\">"+"45"+"</td>" +
    //         " <td class=\"code\">"+"KM342342i"+"</td>" +
    //         " <td class=\"amount\">"+"9000"+"</td>" +
    //         " <td class=\"edit-btn\"><button class=\"btn btn-secondary\" onclick='openEditEquipmentModal(this)'><i class=\"fa fa-edit\"></i></button></td>" +
    //         "<td class=\"delete-btn\"><button class=\"btn btn-secondary\" onclick='deleteEquipment(this)'><i class=\"fa fa-remove\"></i></button></td>" +
    //         "</tr>"
    //     );
    // }
    //alert( "ready!" );
    function callback(err,data) {
        data.data.forEach(function(item){
            $("#allEquipments tbody").append(
                "<tr class='rowEquipment'>" +
                "<td class=\"id\">"+item.id+"</td>" +
                "<td class=\"name\">"+item.name+"</td>" +
                " <td class=\"price\">"+item.price+"</td>" +
                " <td class=\"code\">"+item.vendor_code+"</td>" +
                " <td class=\"amount\">"+item.amount+"</td>" +
                " <td class=\"edit-btn\"><button class=\"btn btn-secondary\" onclick='openEditEquipmentModal(this)'><i class=\"fa fa-edit\"></i></button></td>" +
                "<td class=\"delete-btn\"><button class=\"btn btn-secondary\" onclick='deleteEquipment(this)'><i class=\"fa fa-remove\"></i></button></td>" +
                "</tr>"
            );
        });

    }
    require("../API").getEquipments(callback);
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

function filterSelect(i) {
    var input =  document.getElementsByClassName("mysearch")[0];
    filter = input.value.toUpperCase();
    var list;
    let count = 0;
    let nameRow;
    if(i==1) nameRow="rowTechnic";
    if(i==2) nameRow="rowEquipment";
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
    // ..todo photos
    let add_update = $("#add-btn").text();
    // console.log(selectedType);
    // console.log(mark);
    // console.log(model);
    // console.log(price);
    // console.log(currency);
    // console.log(year);
    // console.log(description);
    let technic = {
        mark_id: null,
        type_id: null,
        model: model,
        amount: 1,
        price: price,
        production_date: year,
        currency: "долар",
        description: description,
        main_photo_location: getPhotos().length > 0 ? getPhotos()[0].val : "default_technic"
    }
    if (currency == 'грн') technic.currency = "гривня";
    if (currency == '€') technic.currency = "євро";

    if(add_update=="Додати") {

        if (checkInputTechnic()) {

            function callback1(err, data) {

                if (data.error) console.log(data.error);
                else {
                    technic.type_id = (data.data[0].id);

                    function callback2(err, data) {
                        if (data.error) console.log(data.error);
                        if (data.data.length < 1) {
                            function callback4(err, data) {
                                // console.log(data.data.insertId);
                                technic.mark_id = data.data.insertId;

                                function callback(err, data) {
                                    if (data.error) console.log(data.error);
                                    else {
                                        console.log("success");
                                    }
                                }

                                require("../API").addTehnic({technic:technic, photos: getPhotos()}, callback);
                            }

                            require("../API").addMarkTechnic({name: mark}, callback4);
                        } else {
                            technic.mark_id = data.data[0].id;

                            function callback(err, data) {
                                if (data.error) console.log(data.error);
                                $('#addTechnicModel').modal('toggle');
                            }

                            require("../API").addTehnic({technic:technic, photos: getPhotos()}, callback);
                        }
                    }

                    require("../API").getId("marks_of_technics", mark, callback2);
                }
            }

            require("../API").getId("types_of_technics", selectedType, callback1);
        } else {
            alert("Невірні дані !!!");
        }
    }
    else {

        var row = $(cell).parents("tr");
        var cols = row.children("td");
        var id  = $(cols[0]).text();
        technic.id = id;

        function callback(err,data) {
            if( err) {
                console.log(err);
                // Notify("Помилка! Не вдалось видалити.",null,null,'success');
            }
            else {
                technic.mark_id = data.data[0].mark_id;
                technic.type_id = data.data[0].type_id;
                function callback5(err,data1) {
                    if( err) {
                        console.log(err);
                        // Notify("Помилка! Не вдалось видалити.",null,null,'success');
                    }
                    else {
                        $('#addTechnicModel').modal('toggle');
                        //console.log("data = "+ data);
                        alert("Товар оновлено!");
                        // Notify("Товар успішно оновлено!",null,null,'success');
                    }
                }
                require("../API").updateTechnic(id,technic,callback5)

            }
        }

        require("../API").getTechnicsById(id,callback)
    }

}

function checkInputTechnic() {
    let selectedType = $('#type_technics').children("option:selected").val();
    let mark = $("#mark-choice").val();
    let model = $("#model-choice").val();
    let price = $("input[type=number][name=price-input]").val();
    //let currency = $('#currency-choice').children("option:selected").val();
    let year = $("input[type=number][name=year-input]").val();
    //let description = $("textarea[name=description]").val();

    if(selectedType.toString().trim() =="" || mark.toString().trim()=="" || model.toString().trim()=="" || price.toString().trim()=="" || year.toString().trim()=="") return false;
    else  return true;
}

function checkInputEquipment() {
    var name = $('#name-equipment').val();
    var price = $("input[type=number][name=price-input]").val();
    var amount = $("#equipment-amount").val();
    var selectedType = $('#type_technics').children("option:selected").val();
    var mark = $("#mark-choice").val();
    var models = $("#model-choice").val();
    if(mark=="Марка") return  false;
    if(models==null) return  false;
    if(name.toString().trim() =="" || price.toString().trim()=="" || amount.toString().trim()=="" || selectedType.toString().trim()=="Тип" || mark.toString().trim()=="" || models.length==0) return false;
    else  return true;
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
    var models = $("#model-choice").val();
    // console.log(name);
    // console.log(code);
    // console.log(price);
    // console.log(currency);
    // console.log(state);
    // console.log(description);
    // console.log(amount);
    let add_update_btn = $("#add-btn").text();

    let equipment = {
        name : name,
        amount:amount,
        price:price,
        vendor_code:code,
        currency:"долар",
        state:state,
        description:description
    };
    if(currency=="€") equipment.currency="євро";
    if(currency=="грн") equipment.currency="гривня";

    if(add_update_btn=="Додати") {

        if (checkInputEquipment()) {

            function callback(err, data) {
                let insertedid = data.data.insertId;
                // console.log(data.data.insertId);
                let model_id = null;

                function callback2(err, data1) {
                    if (err) console.log(err);
                    else {
                        let equipmentmodel;
                        models.forEach(function (item_model) {
                            data1.data.forEach(function (item) {
                                if (item.model == item_model) {
                                    model_id = item.id;
                                    equipmentmodel = {
                                        equipment_id: insertedid,
                                        model_id: model_id
                                    }

                                    function callback3(err, data) {
                                        if (err) console.log(err);
                                        else {
                                            $('#addEquipmentModel').modal('hide');
                                        }
                                    }

                                    require("../API").addEquipmentsModels(equipmentmodel, callback3);
                                }
                            })
                        })
                        $('#addEquipmentModel').modal('hide');
                    }

                }

                require("../API").getModels(callback2);

            }

            require("../API").addEquipment(equipment, callback);

        } else {
            alert("Невірні дані!!!")
        }
    }
    else // update equipment
        {
        let curId = localStorage.getItem("currEquipmentId");
        console.log(curId);
            if (checkInputEquipment()) {

                // function callback5(err, data5) {
                //     if (err) console.log(err);
                //     else {
                //         let eq = data5.data[0];
                //         eq.name = equipment.name;
                //         eq.amount = equipment.amount;
                //         eq.currency = equipment.currency;
                //         eq.price = equipment.price;
                //         eq.vendor_code = equipment.vendor_code;
                //         eq.description = equipment.description;
                //         eq.state = equipment.state;
                //         console.log(eq);
                        function callback6(err, data6) {
                            if (err) console.log(err);
                            else {
                                $('#addEquipmentModel').modal('hide');
                            }
                        }
                        require("../API").updateEquipment(curId,{name : "newname2", amount : 5}, callback6);
                //    }
                // }
                // require("../API").getEquipmentsById(curId, callback5);

            }
    }


    // $("#allEquipments tbody").append(
    //     productBuildTableRow(102));
}


function technicFormClear() {
    $("#mark-choice").val("");
    $('#mark-choice').prop("disabled", true);
    $("#description").val("");
    $("#model-choice").val("");
    $('#model-choice').prop("disabled", true);
    $("#price-input-technic").val("");
    $("#year-technic-input").val("");
    $('#type_technics').val("Тип");
    $('#type_technics').prop("disabled", false);
   // delete photoes if needed
}

function equipmentFormClear() {
    $("#mark-choice").val("");
    $('#mark-choice').prop("disabled", true);
    $("#description").val("");
    $("#model-choice").children().remove();
    $('#model-choice').prop("disabled", true);
    //multipleEquipmentOpen = true;
    $('#multiple-select-container-'+(container_num-1)).remove();
}


function openTab(value){
    document.location.href = API_URL+"/admin-panel?page="+value;
}

function uploadPhoto(){
    require('../API').uploadPhotos($('#fileinput')[0].files,function(err,data){
        if(err || data.error){}
        else {
            require('../API').uploadPhotos(id,{
                photo_location: event.target.files[0].name,
                phone_number: $phone_value.value
            },function(err){
                if (err) console.log(err);
            })
        }
    })
}
/*не корректный */
function getPhotos(){
    var arrCheck = [];
    $('.uploader__file-list li .uploader__file-list__text').each(function(idx, item) {
        var ert = {
            val: $(this, item).text()
        };
        arrCheck.push(ert);
    });
    return arrCheck;
}

$(function(){
    $('#technic_menu').click(function(){
        openTab(1);
    });
    $('#equipments_menu').click(function(){
        openTab(2);
    });
    var options = {
        submitButtonCopy: 'Upload Selected Files',
        instructionsCopy: 'Drag and Drop, or',
        furtherInstructionsCopy: 'Your can also drop more files, or',
        selectButtonCopy: 'Select Files',
        secondarySelectButtonCopy: 'Select More Files',
        dropZone: $(this),
        fileTypeWhiteList: ['jpg', 'png', 'jpeg', 'gif', 'pdf'],
        badFileTypeMessage: 'Sorry, we\'re unable to accept this type of file.',
        testMode: false
    };
    $('#fileUploadForm').uploader(options);

    $('.uploadButton').click(function(){
        addTechnicToDB();
        /*require('../API').uploadPhotos($('#fileinput')[0].files,function(err,data){
            if(err || data.error){}
            else {
                require('../API').uClient(id,{
                    photo_location: event.target.files[0].name,
                    phone_number: $phone_value.value
                },function(err){
                    if (err) console.log(err);
                })
            }
        })*/
    });

    $('#fileinput0').change(function (event) {
        for(var i=0;i<event.target.files.length;i++)
        require('../API').uploadTechnicPhoto(event.target.files[i],function(err,data){
            if(err || data.error)
                console.log(err||data.error);

        })
    })

    $('#secondaryfileinput0').change(function (event) {
        for(var i=0;i<event.target.files.length;i++)
        require('../API').uploadTechnicPhoto(event.target.files[i],function(err,data){
            if(err || data.error)
                console.log(err||data.error);

        })
    })


});