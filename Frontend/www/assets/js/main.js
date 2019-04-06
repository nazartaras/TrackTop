(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.openForm = function() {
    document.getElementById("myForm").style.display = "block";
}

exports.closeForm = function() {
    document.getElementById("myForm").style.display = "none";
}
},{}],2:[function(require,module,exports){
$(function(){
    //This code will execute when the page is ready
    // $('.testSql').click(function(){
    //
    //     var newT = {
    //         mark_id:1,
    //         type_id:1,
    //         amount:32,
    //         price:221,
    //         // model:'AD129'
    //     }
    //
    //     require("./API").addTehnic(newT,function (err,data) {
    //         if(data.error) console.log(data.error);
    //     });
    // });

    function openNav() {
        $("#basketColumn").addClass("widthR");
        $("#main").addClass("margR");
    }

    function closeNav() {
        $("#basketColumn").removeClass("widthR");
        $("#main").removeClass("margR");
    }

    $('.basketBtn').click(function () {
        openNav();
    })

    $('.basketCloseBtn').click(function () {
        closeNav();
    })

    $('#login').click(function() {
        require('./login_form').openForm();
    })

    $('.cancel').click(function() {
        require('./login_form').closeForm();
    })


    require('./signup_form').initializeLogin();

});
},{"./login_form":1,"./signup_form":3}],3:[function(require,module,exports){
var modal = document.getElementById('id01');

function openSignUpForm() {
    modal.style.display='block';
}

exports.initializeLogin = function(){
    $('#signup').click(function() {
        openSignUpForm();
        console.log("121231");
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {

        if (event.target == modal) {
            modal.style.display = "none";
            console.log('2');
        }
    }
}
},{}]},{},[2]);
