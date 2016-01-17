var gulp = require('gulp');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compress', function () {
    return gulp.src('client.js')
      .pipe(uglify())
       .pipe(rename({
          extname: '.min.js'
      }))
      .pipe(gulp.dest('./'));
});

gulp.task('inject', function () {
    var target = gulp.src('index.html'); 
    var sources = gulp.src(['client.min.js', 'content/**/*.css'], { read: false });

    return target.pipe(inject(sources))
      .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
    gulp.run('compress', 'inject');
});


