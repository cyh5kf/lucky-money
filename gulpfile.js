var gulp = require('gulp'),
    less = require("gulp-less"),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    clean = require('gulp-clean'),
    versionNumber = require('gulp-version-number');

/**
 * 开发环境任务
 */

//编译压缩less
gulp.task('less',function(){
    //1.找到less文件
    return gulp.src('src/less/index.less')
    //2.编译为css
    .pipe(less())
    //3.另存为css
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})

//copy js文件
gulp.task('copyjs',  function() {
  return gulp.src('src/js/**.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
});

// copy 图片
gulp.task('copyImage', function () {
    return gulp.src('src/images/**.*')
    .pipe(gulp.dest('dist/images'))
});

//copy html
gulp.task('copyHtml',function(){
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
});

//监听文件修改
gulp.task('watch',function(){
    // 建立浏览器自动刷新服务器
    browserSync.init({
        port: 9999,
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch('src/less/**.less', ['less']);
    gulp.watch('src/js/**.js', ['copyjs']);
    gulp.watch('src/images/**.*', ['copyImage']);
    gulp.watch('src/*.html', ['copyHtml']);
})

//使用gulp.task('default')定义默认任务
//开发构建
gulp.task('build-dev',['less', 'copyjs', 'copyImage', 'copyHtml', 'watch'])



/********************************************************************************************************************* */
/**
 * 生产环境任务
 */
var versionConfig = {
  'value': '%MDS%',
  'append': {
    'key': 'v',
    'to': ['css', 'js'],
  },
};

//删除文件夹
gulp.task('clean', function(){
    return gulp.src('dist')
        .pipe(clean());
})

//编译压缩less
gulp.task('build-less',function(){
    //1.找到less文件
    return gulp.src('src/less/index.less')
    //2.编译为css
    .pipe(less())
    //压缩css
    .pipe(cssmin())
    //3.另存为css
    .pipe(gulp.dest('dist/css'))
})

//copy js文件
gulp.task('build-copyjs',  function() {
  return gulp.src('src/js/**.js')
    .pipe(gulp.dest('dist/js'))
});

//压缩html文件, Html替换css、js文件版本
gulp.task('build-htmlmin',function(){
    return gulp.src('src/index.html')
    .pipe(htmlmin({
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    })) //设置是否压缩html文件 true
    .pipe(versionNumber(versionConfig))
    .pipe(gulp.dest('dist'))
});

//生产环境构建
gulp.task('build',  ['clean'], function() {
    gulp.start('build-less', 'build-copyjs', 'copyImage', 'build-htmlmin')
})