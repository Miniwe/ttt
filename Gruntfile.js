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
    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'assets/img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'public/img/'
            }]
        }
    },
    copy: {
      bootstrapFonts: {
        files: [
          {
            expand: true,
            cwd: "bower_components/bootstrap/dist",
            src: [
              "fonts/**"
            ],
            dest: "public"
          }
        ]
      },
      wow: {
        files: [
          {
            expand: true,
            cwd: "bower_components/wow/dist",
            src: [
              "wow.min.js"
            ],
            "dest": "public/js/"
          }
        ]
      },
      wowCSS: {
        files: [
          {
            expand: true,
            cwd: "bower_components/wow/css/libs",
            src: [
              "animate.css"
            ],
            "dest": "public/css/"
          }
        ]
      },
      bootstrapJS: {
        files: [
          {
            expand: true,
            cwd: "bower_components/bootstrap/dist/js",
            src: [
              "bootstrap.min.js"
            ],
            "dest": "public/js/"
          }
        ]
      }
    },
    handlebarslayouts: {
        home: {
            files: {
                'public/*.html': 'views/*.html'
            },
            options: {
                partials: [
                'views/partials/**/*.hbs',
                'views/layout/layout.html'
                ],
                modules: [
                'views/helpers/helpers-*.js'
                ],
                basePath: 'views/',
                context: {
                        title: 'Биржа лидов',
                        phone: '+ 7 (499) 704 42 95',
                        offers: grunt.file.readJSON('views/data/offers.json')
                    }
            }
        }
    },
    watch: {
        templates: {
            files: ['views/**/*.hbs', 'views/**/*.html'],
            tasks: ['handlebars'],
            options: {
                spawn: false,
            },
        },
        scripts: {
            files: ['assets/js/**/*.js'],
            tasks: ['jshint', 'concat', 'uglify'],
            options: {
                spawn: false,
            },
        },
        images: {
            files: ['assets/img/**/*'],
            tasks: ['imagemin'],
            options: {
                spawn: false,
            },
        },
        css: {
            files: ['assets/less/**/*.less'],
            tasks: ['less'],
            options: {
                spawn: false,
            },
        },
        options: {
          livereload: true
        }
    }
});

// 3. Тут мы указываем Grunt, что хотим использовать этот плагин
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks("grunt-handlebars-layouts");
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-copy');
// grunt.loadNpmTasks('grunt-notify');

// grunt.loadNpmTasks('grunt-contrib-coffee');

// 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
// grunt.registerTask('default', ['coffee', 'jshint', 'concat', 'uglify', 'imagemin', 'compass']);
// grunt.registerTask('short', ['coffee', 'concat', 'uglify', 'compass']);

grunt.registerTask('handlebars', ['handlebarslayouts']);
grunt.registerTask('default', ['handlebars', 'imagemin', 'concat', 'copy','jshint','less','uglify']);

};