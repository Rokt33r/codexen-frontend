module.exports = {

    // build path
    build_path:'build',
    dist_path:'dist',

    // src path
    src_path:{
        js:['src/**/*.js', '!src/**/*.spec.js'],
        sass:['src/**/*.scss'],
        tpls:['src/**/*.tpl.html']
    },

    // vendor path
    vendor_path:[
        'bower_components/codemirror/lib/codemirror.js',
        'bower_components/codemirror/lib/codemirror.css',
        'bower_components/angular/angular.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-ui-codemirror/ui-codemirror.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/fontawesome/**/fonts/*',
        'bower_components/fontawesome/**/css/font-awesome.css',
        'bower_components/angular-jwt/dist/angular-jwt.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-ui-select/dist/select.js',
        'bower_components/angular-ui-select/dist/select.css',
        'bower_components/lodash/lodash.js'
    ]

};
