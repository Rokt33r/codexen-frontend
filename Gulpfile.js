var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var templateCache = require('gulp-angular-templatecache');
var globby = require('globby');
var template = require('gulp-template');
var concat = require('gulp-concat');

var del = require('del');
var runSequence = require('run-sequence');

var rev = require('gulp-rev');
var merge = require('merge-stream');

var config = require('./build.conf');
var build_path = config.build_path;
var dist_path = config.dist_path;
var src_path = config.src_path;
var vendor_path = config.vendor_path;

gulp.task('js', function(){
    return gulp.src(src_path.js)
        .pipe(gulp.dest(build_path));
});

gulp.task('sass', function(){
    return gulp.src(src_path.sass)
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(build_path));
});

gulp.task('tpls', function(){
    return gulp.src(src_path.tpls)
        .pipe(templateCache())
        .pipe(gulp.dest(build_path));
});

gulp.task('vendor', function(){
    return gulp.src(vendor_path)
        .pipe(gulp.dest(build_path + '/vendor'));
});

gulp.task('index', function(){
    var files = globby.sync([build_path + '/**/*', '!'+build_path+'/vendor/**/*']);

    var filter = function(files, ext){
        return files.filter(function(file){
            var reg = new RegExp('.+\.'+ext+'$');
            return file.match(reg);
        }).map(function(file){
            return file.replace('build/', '');
        });
    };
    var scripts = filter(files, 'js');
    var styles = filter(files, 'css');

    return gulp.src('src/index.html')
        .pipe(template({
            scripts:scripts,
            styles:styles
        }))
        .pipe(gulp.dest(build_path));
});

gulp.task('build', function(cb){
    runSequence(['js', 'sass', 'tpls', 'vendor'], 'index', cb);
});

gulp.task('watch', function(cb){

    gulp.watch(src_path.js, ['js']);

    gulp.watch(src_path.sass, ['sass']);

    gulp.watch(src_path.tpls, ['tpls']);

    gulp.watch([build_path + '/**/*.js', 'src/index.html'], ['index']);

});

gulp.task('del', function(cb){
    del(build_path + '/**/*', cb);
});

gulp.task('default', function(cb){
    runSequence('del', 'build', 'watch', cb);
});

// `dist` task must be used after `build` task done.
gulp.task('del-dist', function(cb){
    del(dist_path + '/**/*', cb);
});

gulp.task('build-dist', function(){
    var js = gulp.src([build_path + '/**/*.js', '!'+build_path+'/vendor/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(rev())
        .pipe(gulp.dest(dist_path));

    var css = gulp.src(build_path + '/all.css')
        .pipe(rev())
        .pipe(gulp.dest(dist_path));

    var vendor = gulp.src(build_path + '/vendor/**/*')
        .pipe(gulp.dest(dist_path + '/vendor'));

    return merge(js, css, vendor);
});

gulp.task('index-dist', function(){
    var files = globby.sync([dist_path + '/**/*', '!'+dist_path+'/vendor/**/*']);

    var filter = function(files, ext){
        return files.filter(function(file){
            var reg = new RegExp('.+\.'+ext+'$');
            return file.match(reg);
        }).map(function(file){
            return file.replace('dist/', '');
        });
    };
    var scripts = filter(files, 'js');
    var styles = filter(files, 'css');

    return gulp.src('src/index.html')
        .pipe(template({
            scripts:scripts,
            styles:styles
        }))
        .pipe(gulp.dest(dist_path));
});

gulp.task('dist', function(cb){
    runSequence('del-dist', 'build-dist', 'index-dist', cb);
});