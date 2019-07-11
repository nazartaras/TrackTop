var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');
    var db = require('./db');

    db.connect();

    //Налаштування URL за якими буде відповідати сервер
    app.post('/api/addtechnic/', api.addTehnic);
    app.post('/api/addclient/', api.addClient);
    app.post('/api/addcheck/', api.addCheck);
    app.post('/api/addcheckequipment/', api.addCheckEquipment);
    app.post('/api/addchecktechnic/', api.addCheckTechnic);
    app.get('/api/gettypes', api.get_types_of_technics);
    app.get('/api/getmarks', api.get_marks_of_technics);
    app.get('/api/getclient', api.get_user_information);
    app.get('/api/getequipments', api.get_equipments);

    app.post('/api/signin',  api.sign_in);

    app.get('/api/gettechnics', api.get_technics);
    app.post('/api/gettechnics', api.get_technics_by_tp);

    app.post('/api/gettechnicsmodelim', api.get_technics_im_by_tp_model);
    app.post('/api/upload_user_photo', api.upload_user_photo);
    app.post('/api/update_user', api.update_user);


    //Сторінки
    app.get('/', pages.mainPage);
    app.get('/profile', pages.profile);
    app.get('/technics', pages.technics);
    app.get('/technic', pages.technic);
    app.get('/equipments', pages.equipments);

    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
    app.use('/images',express.static(path.join(__dirname, '../Backend/res/images')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;