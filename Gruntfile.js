/**
 * Created by Andrew.
 */
module.exports = function(grunt) {
    //Налаштування збірки Grunt
    var config = {
        //Інформацію про проект з файлу package.json
        pkg: grunt.file.readJSON('package.json'),

        //Конфігурація для модуля browserify (перетворює require(..) в код
        browserify:     {
            //Загальні налаштування (grunt-browserify)
            options:      {

                //brfs замість fs.readFileSync вставляє вміст файлу
                transform:  [ require('brfs') ],
                browserifyOptions: {
                    //Папка з корнем джерельних кодів javascript
                    basedir: "Frontend/src/js/"
                }
            },

            //Збірка
            trackTop: {
                src:        'Frontend/src/main.js',
                dest:       'Frontend/www/assets/js/main.js'
            },
            technics: {
                src:        'Frontend/src/technics/technicsMain.js',
                dest:       'Frontend/www/assets/js/technicsMain.js'
            },
            equipments: {
                src:        'Frontend/src/technics/equipmentsMain.js',
                dest:       'Frontend/www/assets/js/equipmentsMain.js'
            },
            oneTechnic: {
                src:        'Frontend/src/technics/technicMain.js',
                dest:       'Frontend/www/assets/js/oneTechnicMain.js'
            },
            profile: {
                src:        'Frontend/src/profile/main_profile.js',
                dest:       'Frontend/www/assets/js/profile_main.js'
            }

        }
    };

    //Налаштування відстежування змін в проекті
    var watchDebug = {
        options: {
            'no-beep': true
        },
        //Назва завдання будь-яка
        scripts: {
            //На зміни в яких файлах реагувати
            files: ['Frontend/src/**/*.js', 'Frontend/**/*.ejs'],
            //Які завдання виконувати під час зміни в файлах
            tasks: ['browserify:trackTop']
        }
    };


    //Ініціалузвати Grunt
    config.watch = watchDebug;
    grunt.initConfig(config);

    //Сказати які модулі необхідно виокристовувати
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //Список завданнь за замовчуванням
    grunt.registerTask('default',
        [
            'browserify:trackTop',
            'browserify:technics',
            'browserify:equipments',
            'browserify:oneTechnic',
            'browserify:profile',
            //Інші завдання які необхідно виконати
        ]
    );

};