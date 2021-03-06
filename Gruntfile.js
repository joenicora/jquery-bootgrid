/*jshint node:true*/
module.exports = function (grunt)
{
    "use strict";

    /* Hint: Using grunt-strip-code to remove comments from the release file */

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\r\n\r\n',
                banner: '/*! <%= "\\r\\n * " + pkg.title %> v<%= pkg.version %> - <%= grunt.template.today("mm/dd/yyyy") + "\\r\\n" %>' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <%= (pkg.homepage ? "(" + pkg.homepage + ")" : "") + "\\r\\n" %>' +
                    ' * Licensed under <%= pkg.licenses[0].type + " " + pkg.licenses[0].url + "\\r\\n */\\r\\n" %>' + 
                    ';(function ($, window, undefined)\r\n{\r\n    /*jshint validthis: true */\r\n    "use strict";\r\n\r\n',
                footer: '\r\n})(jQuery, window);',
                process: function(src, filepath)
                {
                    var result = src.trim().replace(/(.+?\r\n)/gm, '    $1'),
                        end = [0, ""];
                    switch (result[result.length - 1])
                    {
                        case ";":
                            end = [2, "    };"];
                            break;

                        case "}":
                            end = [1, "    }"];
                            break;
                    }
                    return result.substr(0, result.length - end[0]) + end[1];
                }
            },
            dist: {
                files: {
                    '<%= pkg.folders.dist %>/<%= pkg.namespace %>.js': [
                        '<%= pkg.folders.src %>/internal.js',
                        '<%= pkg.folders.src %>/public.js',
                        '<%= pkg.folders.src %>/plugin.js',
                        '<%= pkg.folders.src %>/extensions.js'
                    ]
                }
            }
        },
        //"regex-replace": {
        //    all: {
        //        src: ['<%= pkg.folders.nuget %>/<%= pkg.namespace %>.nuspec'],
        //        actions: [
        //            {
        //                name: 'versionNumber',
        //                search: /<version>.*?<\/version>/gi,
        //                replace: '<version><%= pkg.version %></version>'
        //            }
        //        ]
        //    }
        //},
        exec: {
            createPkg: {
                cmd: "<%= pkg.folders.nuget %>\\Nuget pack <%= pkg.folders.nuget %>\\<%= pkg.namespace %>.nuspec -OutputDirectory <%= pkg.folders.dist %> -Version <%= pkg.version %>"
            }
        },
        compress: {
            main: {
                options: {
                    archive: '<%= pkg.folders.dist %>/<%= pkg.namespace %>-<%= pkg.version %>.zip'
                },
                files: [
                  { flatten: true, expand: true, src: ['<%= pkg.folders.dist %>/*.js', '<%= pkg.folders.dist %>/*.css'], dest: '/' }
                ]
            }
        },
        uglify: {
            options: {
                preserveComments: 'some',
                report: 'gzip'
            },
            all: {
                files: {
                    '<%= pkg.folders.dist %>/<%= pkg.namespace %>.min.js': ['<%= pkg.folders.dist %>/<%= pkg.namespace %>.js']
                }
            }
        },
        less: {
            development: {
                files: {
                    "<%= pkg.folders.dist %>/<%= pkg.namespace %>.css": "<%= pkg.folders.src %>/<%= pkg.namespace %>.less"
                }
            }
        },
        qunit: {
            files: ['test/index.html']
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    console: true
                }
            },
            files: ['<%= pkg.folders.dist %>/<%= pkg.namespace %>.js'],
            test: {
                options: {
                    globals: {
                        jQuery: true,
                        $: true,
                        QUnit: true,
                        module: true,
                        test: true,
                        start: true,
                        stop: true,
                        expect: true,
                        ok: true,
                        equal: true,
                        deepEqual: true,
                        strictEqual: true
                    }
                },
                files: {
                    src: [
                        'test/tests-internal.js',
                        'test/tests-rendering.js',
                        'test/tests-extensions.js'
                    ]
                }
            },
            grunt: {
                files: {
                    src: [
                        'Gruntfile.js'
                    ]
                }
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: '<%= pkg.folders.dist %>',
                    outdir: '<%= pkg.folders.docs %>/'
                }
            }
        },
        clean: {
            api: ["<%= pkg.folders.docs %>"],
            build: ["<%= pkg.folders.dist %>"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('api', ['clean:api', 'yuidoc']);
    grunt.registerTask('build', ['clean:build', 'concat', 'jshint', 'qunit', 'less']);
    grunt.registerTask('release', ['build', 'api', 'uglify', 'compress', 'exec:createPkg']);
};