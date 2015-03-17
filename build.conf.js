module.exports = {
    //
    url:'codexen.app',
    api_url:'api.codexen.app',

    // build path
    build_path:'build',

    // src path
    src_path:{
        js:['src/**/*.js', '!src/**/*.spec.js'],
        sass:['src/**/*.scss'],
        tpls:['src/**/*.tpls']
    },

    // vendor path
    vendor:{
        codemirror:['bower_components/codemirror/lib/codemirror.js','bower_components/codemirror/lib/codemirror.css'],
        ng:'bower_components/angular/angular.js',
        ngBootstrap:'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        ngCodemirror:'bower_components/angular-ui-codemirror/ui-codemirror.js',
        ngUiRouter:'bower_components/angular-ui-router/release/angular-ui-router.js',
        fa:['bower_components/fontawesome/fonts/*', 'bower_components/fontawesome/css/font-awesome.css']
    }

}
