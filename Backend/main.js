var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var isAuth = require('./authentification/isAuth.js');
var roleRequired = require('./authentification/RoleRequired.js');
var attachCurrentUser = require('./authentification/attachCurrentUser.js');
var robots = require('express-robots-txt');
//const sitemap = require('express-simple-sitemap');
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
let sitemap

function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');
    var db = require('./db');

    db.connect();

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    //Налаштування URL за якими буде відповідати сервер

    app.post('/api/addtechnic/', api.addTehnic);
    app.post('/api/addreview/', api.addReview);

    app.post('/api/addequipment/', api.addEquipment);
    app.post('/api/addequipmentsmodels/', api.addEquipmentsModels);
    app.post('/api/addclient/', api.addClient);
    app.post('/api/addcheck/', api.addCheck);
    app.post('/api/addcheckequipment/', api.addCheckEquipment);
    app.post('/api/addchecktechnic/', api.addCheckTechnic);
    //app.post('/api/addtypetechnics/', api.addCheckEquipment);
    app.post('/api/addmarktechnics/', api.addMarkTechnics);
    app.post('/api/addmodel/', api.addModel);
    app.get('/api/gettypes', api.get_types_of_technics);
    app.get('/api/getmarks', api.get_marks_of_technics);
    app.get('/api/getclient', api.get_user_information);
    app.get('/api/getequipments', api.get_equipments);
    app.get('/api/getmodelsbytypemark', api.get_models_by_type_mark);
    app.get('/api/getid', api.get_id);
    app.get('/api/getmodels', api.get_models);
    app.get('/api/getreview', api.get_review);
    app.get('/api/getreviews', api.get_reviews);

    app.post('/api/signin',  api.sign_in);

    app.get('/api/gettechnics', api.get_technics);
    app.post('/api/gettechnics', api.get_technics_by_tp);
    app.post('/api/gettechnicsbyid', api.get_technic_by_id);
    app.post('/api/getequipmentsbyid', api.get_equipment_by_id);


    // app.post('/api/gettechnicsmodelim', api.get_technics_im_by_tp_model);
    app.post('/api/gettechnicsmodelim', api.get_technics_im_by_id);
    app.post('/api/getequipmentim', api.get_equipment_im_by_id);
    app.post('/api/upload_user_photo', api.upload_user_photo);
    app.post('/api/upload_technic_photo', api.upload_technic_photo);
    app.post('/api/upload_equipment_photo', api.upload_equipment_photo);
    app.post('/api/update_user', api.update_user);
    app.post('/api/update_review', api.update_review);
    app.post('/api/update_technic', api.update_technic);
    app.post('/api/update_equipment', api.update_equipment);
    app.post('/api/delete_technic_by_id', api.delete_technic_by_id);
    app.post('/api/delete_equipments_by_id', api.delete_equipments_by_id);
    app.post('/api/delete_equipments_models_by_id', api.delete_equipments_models_by_id);


    //Сторінки
    app.get('/', pages.mainPage);
    app.get('/profile', pages.profile);
    app.get('/technics', pages.technics);
    app.get('/technic', pages.technic);
    app.get('/equipments', pages.equipments);
    app.get('/equipment', pages.equipment);
    app.get('/about', pages.about);
    app.get('/reviews', pages.reviews);
    // app.use(sitemap({
    //     sitemapUrl: '/sitemap.xml', // optional, default value is '/sitemap.xml'
    // }));

    app.get('/sitemap.xml', function(req, res) {
        res.header('Content-Type', 'application/xml');
        res.header('Content-Encoding', 'gzip');
        // if we have a cached entry send it
        if (sitemap) {
            res.send(sitemap)
            return
        }
        try {
            const smStream = new SitemapStream({ hostname: 'http://tracktop.com.ua/' })
            const pipeline = smStream.pipe(createGzip());

            smStream.write({ url: '/technics?type=Комбайни',  changefreq: 'daily', priority: 0.8 })
            smStream.write({ url: '/technics?type=Сівалки',  changefreq: 'daily', priority: 0.8 })
            smStream.write({ url: '/technics?type=Трактори',  changefreq: 'daily', priority: 0.8 })
            smStream.write({ url: '/technics?type=Преси-підбирачі',  changefreq: 'daily', priority: 0.8 })
            smStream.write({ url: '/technics?type=Плуги',  changefreq: 'daily', priority: 0.8 })
            smStream.write({ url: '/equipments',  changefreq: 'daily', priority: 0.8 })
            smStream.write({ url: '/about',  changefreq: 'monthly',  priority: 0.6 })
            smStream.end()

            // cache the response
            streamToPromise(pipeline).then(sm => sitemap = sm)
            // stream the response
            pipeline.pipe(res).on('error', (e) => {throw e})
        } catch (e) {
            console.error(e)
            res.status(500).end()
        }
    })

    app.get('/admin-panel', /*isAuth, attachCurrentUser, roleRequired.requiredRole('admin'),*/ pages.adminPanel);

    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
    app.use('/images',express.static(path.join(__dirname, '../Backend/res/images')));
    app.use(robots(__dirname + '/robots.txt'));
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