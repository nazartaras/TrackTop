openAddTechnicModel = function () {
    $('#addTechnicModel').modal('show');
}

openEditTechnicModal = function(cell) {
    $('#addTechnicModel').modal('show');
   // console.log(cell);
    var row = $(cell).parents("tr");
    var cols = row.children("td");
    var id  = $(cols[0]).text();
    console.log(id);
    //children("button")[0]).data("id");
    $("#sel1").val($(cols[1]).text());
    $("#mark-choice").val($(cols[2]).text());
    $("#price-input-technic").val($(cols[4]).text());
    // Change Update Button Text
    $("#add-btn").text("Оновити");
}

openAddEquipmentModel = function () {
    $('#addEquipmentModel').modal('show');
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
            "<td class=\"delete-btn\"><button class=\"btn btn-secondary\" onclick='openEditTechnicModal(this)'><i class=\"fa fa-remove\"></i></button></td>" +
            "</tr>"
        );
    }
    alert( "ready!" );
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
    var selectedType = $('#sel1').children("option:selected").val();
    var mark = $("#mark-choice").val();
    var price = $("input[type=number][name=price-input]").val();
    var currency = $('#currency-choice').children("option:selected").val();
    var year = $("input[type=number][name=year-input]").val();
    var description = $("textarea[name=description]").val();
    // console.log(selectedType);
    // console.log(mark);
    // console.log(price);
    // console.log(currency);
    // console.log(year);
    // console.log(description);

    // function callback(err,data) {
    //     if(data.error) console.log(data.error);
    //     data.data.forEach(function(item){
    //         l.push(item)
    //     });
    //     showTechnics(l);
    // }
    //     require("../API").getTechnics(callback);
}

addEquipmentToDB = function () {
    var name = $('#name-equipment').val();
    var code = $("#equipment-code").val();
    var price = $("input[type=number][name=price-input]").val();
    var currency = $('#currency-choice').children("option:selected").val();
    var state = $('#state-choice').children("option:selected").val();
    var amount = $("#equipment-amount").val();
    var description = $("textarea[name=description]").val();
    console.log(name);
    console.log(code);
    console.log(price);
    console.log(currency);
    console.log(state);
    console.log(description);
    console.log(amount)
}