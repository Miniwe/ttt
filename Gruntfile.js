module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            myFiles: ['assets/js/**/*.js', '!assets/js/vendor/**/*.js'],
            options: {
              curly: true,
              eqeqeq: true,
              eqnull: true,
              browser: true,
              globals: {
                jQuery: true
            },
        },
    },
    concat: {
        dist: {
            src: [
                    'assets/js/vendor/*.js', // Все JS в папке libs
                    'assets/js/app.js'
                    ],
                    dest: 'public/js/script.js'
                }
            },
            less: {
              development: {
                  options: {
                    paths: ["assets/less"]
                },
                files: {
                    "public/css/style.css": "assets/less/style.less"
                }

            },
            modifyVars: {
                imgPath: '"/images"',
                bgColor: 'red'
            }
        },
        uglify: {
            build: {
                src: 'public/js/script.js',
                dest: 'public/js/script.min.js'
            }
        },
        staticHandlebars: {
            default: {

                options: {
                    // filesRoot: 'views/assets', //used for JS/CSS files
                    // packagedFilesPath: 'public',
                    json: '',
                    partials:'',
                    helpers:''
                },
                files: {'public/**/*.html': 'views/**/*.hbt'}
            }
        },

        // imagemin: {
        //     dynamic: {
        //         files: [{
        //             expand: true,
        //             cwd: 'assets/img/',
        //             src: ['**/*.{png,jpg,gif}'],
        //             dest: 'img/'
        //         }]
        //     }
        // },

        watch: {
            // templates: {
            //     files: ['views/**/*.hbt'],
            //     tasks: ['staticHandlebars'],
            //     options: {
            //         spawn: false,
            //     },
            // },
            // scripts: {
            //     files: ['assets/coffee/*.coffee'],
            //     tasks: ['coffee', 'jshint', 'concat', 'uglify'],
            //     options: {
            //         spawn: false,
            //     },
            // },
            css: {
                files: ['assets/less/**/*.scss'],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-static-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-notify');

    // grunt.loadNpmTasks('grunt-contrib-coffee');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    // grunt.registerTask('default', ['coffee', 'jshint', 'concat', 'uglify', 'imagemin', 'compass']);
    // grunt.registerTask('short', ['coffee', 'concat', 'uglify', 'compass']);

    grunt.registerTask('default', ['staticHandlebars', 'concat','jshint','less','uglify']);

};