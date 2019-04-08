var Templates = require('./Templates');

var basil = require('basil.js');
basil = new basil();

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

    initialiseCart();
}



var allPrice = 0;
var amountOfOrders = 0;

var Cart = [];

var $cart = $(".buyList");
var flag=true;

function addToCart(tech) {

    Cart.forEach(function(cart_item){
        if(cart_item.title==tech.title) {
            cart_item.quantity += 1;
            allPrice += tech.price;
            amountOfOrders += 1;
            flag=false;
            return;
        }
    });
    if(flag){
        allPrice += tech.price;
        amountOfOrders += 1;
        Cart.push({
            title: tech.title,
            price: tech.price,
            currency: tech.currency,
            icon: tech.icon,
            quantity: 1
        });
    }
    flag=true;
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {

    if(Cart.indexOf(cart_item)!=-1) {
        allPrice -= (cart_item.price)*cart_item.quantity;
        amountOfOrders -= cart_item.quantity;
        delete Cart[Cart.indexOf(cart_item)];
    }
    Cart = Cart.filter(function(x) {
        return x !== undefined && x !== null;
    });
    //Після видалення оновити відображення
    updateCart();
}

var $amount = $(".amountOfBoughtPizz");
var $allPrice = $(".amountLabel");

function initialiseCart() {
    var savedOrders = basil.get('amountOfOrders');
    if(savedOrders>0){
        Cart = basil.get('orders');
        Cart = Cart.filter(function(x) {
            return x !== undefined && x !== null;
        });
        allPrice = basil.get('price');
        amountOfOrders = basil.get('amountOfOrders');
    }

    $(".orderButton").click(function () {
        if(Cart.length!=0){
            removeAll();

        }
    });

    $amount.html("");
    $amount.append(amountOfOrders);
    $allPrice.html("");
    $allPrice.append(allPrice);
    $(".labelOrderDelete").click(function(){
        Cart.forEach(removeFromCart);
    });
    updateCart();
}

function getTechnicsInCart() {
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    console.log(Cart);
    $cart.html("");
    $amount.html("");
    $amount.append(amountOfOrders);
    $allPrice.html("");
    $allPrice.append(allPrice);

    function showOne(cart_item) {
        var html_code = Templates.technicInOrder({technic:cart_item});

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            allPrice += cart_item.price;
            amountOfOrders += 1;
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            if(cart_item.quantity>1){
                cart_item.quantity -= 1;
                allPrice -= cart_item.price;
                amountOfOrders -= 1;
            }
            else removeFromCart(cart_item);
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".removeButton").click(function(){
            removeFromCart(cart_item);
        });
        $cart.append($node);
    }

    Cart.forEach(showOne);
    basil.set("orders",Cart);
    basil.set("price",allPrice);
    basil.set("amountOfOrders",amountOfOrders);
}

function removeAll(){
    Cart.forEach(function(el){
        removeFromCart(el);
    });
}

exports.initialiseCart = initialiseCart;
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.getTechnicsInCart = getTechnicsInCart;










