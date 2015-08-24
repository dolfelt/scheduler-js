var gulp = require("gulp");
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require("babelify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var assign = require('lodash.assign');

var concat = require("gulp-concat");
var sass = require("gulp-sass");
var connect = require("gulp-connect");

// Configuration
var output = {
  'js': './dist/assets/js',
  'css': './dist/assets/css'
};
var vendorFiles = [
  'node_modules/mithril/mithril.js',
  'node_modules/underscore/underscore.js'
];


// add custom browserify options here
var customOpts = {
  entries: ['./src/app.js'],
  paths: ['./node_modules','./src'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
b.transform(babelify);

gulp.task("bundle", bundle);
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(output.js));
}

gulp.task("vendor", function() {
  return gulp.src(vendorFiles)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(output.js));
});

gulp.task('sass', function () {
  return gulp.src('./sass/[^_]*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(output.css));
});

gulp.task("build", ["vendor", "bundle", "sass"], function() {
  return gulp.src("./src/**/*.html")
    .pipe(gulp.dest('./dist'));
});



gulp.task("serve", ["build", "watch"], function() {
  return connect.server({
    root: "./dist",
    livereload: true,
    fallback: "./dist/index.html"
  });
});

gulp.task("watch", function () {
  b.on('update', bundle); // on any dep update, runs the bundler
  gulp.watch('./sass/**/*.scss', ['sass']);
  return bundle();
});

gulp.task("default", ["build", "watch"]);
