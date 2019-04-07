
function openNav() {
    $("#basketColumn").addClass("widthR");
    $("#main").addClass("margR");
    $(".header").addClass("margR");
    $("#myForm").addClass("margR");
}

function closeNav() {
    $("#basketColumn").removeClass("widthR");
    $("#main").removeClass("margR");
    $(".header").removeClass("margR");
    $("#myForm").removeClass("margR");
}

exports.initialiseBasket = function(){
    $('.basketBtn').click(function () {
        openNav();
    })

    $('.basketCloseBtn').click(function () {
        closeNav();
    })
}