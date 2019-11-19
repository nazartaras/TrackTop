openAddTechnicModel = function () {
    $('#addTechnicModel').modal('show');
}

openAddEquipmentModel = function () {
    $('#addEquipmentModel').modal('show');
}

$( window ).on( "load", function() {
    console.log( "window loaded" );
   // alert( "ready!" );
    function callback(err,data) {
        if(data.error) console.log(data.error);
        data.data.forEach(function(item){
           console.log("a");
        });

    }
    require("../api.js").get_technics(callback);
});

function filterSelection(nameRow) {
    var input =  document.getElementsByClassName("mysearch")[0];
    filter = input.value.toUpperCase();
    console.log(filter);
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