var Templates = require('../Templates');

var $types =   $('.typesOfTechnic');


exports.showTypes = function(list) {

    $types.html("");

    function showOne(type) {
        var html_code = Templates.typeOfTechnic({type: type});

        var $node = $(html_code);

        $types.append($node);
    }

    list.forEach(showOne);
}