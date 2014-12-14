module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.initConfig({

        mochaTest: {
            test: {
                options: {
                    reporter         : 'spec',
                    quiet            : false,
                    clearRequireCache: false
                },
                src    : ['test/**/*.js']
            }
        },

        watch: {
            scripts: {
                files  : ['./lib/**/*.js', './test/**/*.js'],
                tasks  : ['mochaTest', 'mocha_istanbul:coverage'],
                options: {
                    debounceDelay: 250
                }
            }
        },

        mocha_istanbul: {
            coverage : {
                src    : 'test',
                options: {
                    mask: '*.js'
                }
            },
            coveralls: {
                src: ['test'],
                options: {
                    coverage:true,
                    check: {
                        lines: 75,
                        statements: 75
                    },
                    root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
                    reportFormats: ['cobertura','lcovonly']
                }
            }
        }

    });

    grunt.registerTask('test', ['mocha_istanbul:coveralls']);
    grunt.registerTask('coverage', 'mocha_istanbul:coverage');

};