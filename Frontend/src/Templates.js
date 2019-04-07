var fs = require('fs');
var ejs = require('ejs');


exports.typeOfTechnic = ejs.compile(fs.readFileSync('./Frontend/templates/type_of_technics.ejs', "utf8"));
exports.technicInList = ejs.compile(fs.readFileSync('./Frontend/templates/technic_in_list.ejs', "utf8"));