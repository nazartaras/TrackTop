var fs = require('fs');
var ejs = require('ejs');


exports.typeOfTechnic = ejs.compile(fs.readFileSync('./Frontend/templates/type_of_technics.ejs', "utf8"));