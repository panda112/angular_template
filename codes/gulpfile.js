// 引入 gulp
var gulp = require("gulp"),

    // 引入组件
    jshint = require("gulp-jshint"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

// 默认任务
gulp.task("default", function() {
    gulp.run("lint", "sass", "scripts");

    // 监听文件变化
    gulp.watch("./js/*.js", function() {
        gulp.run("lint", "sass", "scripts");
    });
});

// 检查脚本
gulp.task("lint", function() {
    gulp.src("./js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

// 编译Sass
gulp.task("sass", function() {
    gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/css"));
});

// 合并，压缩文件
gulp.task("scripts", function() {
    gulp.src("./js/*.js")
        .pipe(concat("all.js"))
        .pipe(gulp.dest("./dist/scripts"))
        .pipe(rename("all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/scripts"));
});
