var LIB_INF = {
    "es5-shim": {
        js: "es5-shim.js"
    },
    "modernizr": {
        js: "modernizr.js"
    },
    "jquery": {
        base: "dist",
        js: "jquery.js"
    },
    "angular": {
        js: "angular.js"
    },
    "angular-animate": {
        js: "angular-animate.js"
    },
    "angular-cookies": {
        js: "angular-cookies.js"
    },
    "angular-loader": {
        js: "angular-loader.js"
    },
    "angular-sanitize": {
        js: "angular-sanitize.js"
    },
    "angular-route": {
        js:"angular-route.js"
    },
    "ngLocale": {
        js:"angular-locale_zh-cn.js"
    },
    "angular-bindonce": {
        js: "bindonce.js"
    },
    "angular-busy": {
        base: "dist",
        js: "angular-busy.js",
        css: "angular-busy.css"
    },
    "angular-ui-bootstrap": {
        // 需要先打包
        base: "dist",
        js: "ui-bootstrap-tpls-0.12.0.js"
    },
    "animate.css": {
        css: "animate.css"
    },
    "font-awesome": {
        css: "font-awesome.css",
        fonts: "fonts/*"
    },
    "bootstrap": {
        base: "dist",
        css:"bootstrap.css",
        fonts:"fonts/*"
    },

  /*  "fullcalendar": {
        base: "dist",
        css:"fullcalendar.css",
        js: "fullcalendar.js"
    },*/

    "xdate": {
        base: "src",
        js: "xdate.js"
    },
    "highcharts": {
        js:"highcharts.src.js"
    },
    "underscore": {
        js: "underscore.js"
    },
    "xss": {
        base: "dist",
        js: "xss.js"
    }
};

var PACKAGE_CONF = {
    // bower库
    libBase: "bower_components",

    // 其他第三方库, bower里面没有的
    thirdPardBase: "lib",

    dist: "dist"
};

var gulp = require('gulp'),
    pkg = require('./package.json');
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    _ = require("underscore"),
    today = new Date();

today = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();


gulp.task('default', function() {
    var js = [], jsBanner = "";
    var css = [], cssBanner = "";
    var fonts = [];

    _.forEach(LIB_INF, function(v, k) {

        var sub = v.base ? "/" + v.base : "";
        var base = k  + sub + "/";

        if (v.js) {

            if ( _.isArray(v.js)) {
                _.forEach(v.js, function(vn, kn){
                   js.push(base + vn);
                    jsBanner += (vn + ",");
                });
            } else {
                js.push(base + v.js);
                jsBanner += (v.js + ",");
            }

        }

        if (v.css) {

            if ( _.isArray(v.css)) {
                _.forEach(v.css, function(vn, kn){
                    css.push(base + vn);
                    cssBanner += (vn + ",");
                });
            } else {
                css.push(base + v.css);
                cssBanner += (v.css + ",");
            }
        }

        if (v.fonts) {

            if ( _.isArray(v.fonts)) {
                _.forEach(v.fonts, function(vn, kn){
                    fonts.push(base + vn);
                });
            } else {
                fonts.push(base + v.fonts);
            }

        }
    });

    console.log(js, css, fonts);

    if(js.length) {

       gulp.src(js, {cwd: PACKAGE_CONF.libBase})
           .pipe(plugins.concatUtil("mobileCampus-lib-all" + '.js'))
           .pipe(plugins.concatUtil.header("//" + jsBanner + " "  + today + "\n"))
           .pipe(gulp.dest(PACKAGE_CONF.dist + "/js"))
           .pipe(plugins.rename(function(path) { path.extname = '.min.js'; }))
           .pipe(plugins.uglify())
           .pipe(plugins.concatUtil.header("//" + jsBanner + " "  + today + "\n"))
           .pipe(gulp.dest(PACKAGE_CONF.dist + "/js"));
    }

    if (css.length) {
        gulp.src(css, {cwd: PACKAGE_CONF.libBase})
            .pipe(plugins.concatUtil("mobileCampus-lib-all" + '.css'))
            .pipe(plugins.concatUtil.header("/*" + cssBanner + " "  + today + "*/\n"))
            .pipe(gulp.dest(PACKAGE_CONF.dist + "/css"))
            .pipe(plugins.rename(function(path) { path.extname = '.min.css'; }))
            .pipe(plugins.minifyCss())
            .pipe(plugins.concatUtil.header("/*" + cssBanner + " "  + today + "*/\n"))
            .pipe(gulp.dest(PACKAGE_CONF.dist + "/css"));
    }

    if (fonts.length){
        gulp.src(fonts, {cwd: PACKAGE_CONF.libBase})

            .pipe(gulp.dest(PACKAGE_CONF.dist + "/fonts"))
    }

});
