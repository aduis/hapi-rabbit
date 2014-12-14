module.exports = function(grunt)
{
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false,
                    clearRequireCache: false 
                },
                src: ['test/**/*.js']
            }
        }

    });

    grunt.registerTask('test', 'mochaTest');

};