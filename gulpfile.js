"use strict";
const gulp = require('gulp')
const fs = require('fs')
const exec = require('child_process').exec;
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cssnano = require("cssnano");
const del = require("del");
const eslint = require("gulp-eslint");
const autoprefixer = require("autoprefixer");
const extend = require('extend')
const merge = require('merge-stream');

var vendors = ['bootstrap', 'popper.js'];

var options = {};
var options = {
  theme: {
    scss: {
      files: ['./styles/style.scss', './styles/style-admin.scss']
    }
  }
}


// If config.js exists, load that config and overriding the options object.
if (fs.existsSync("./config.js")) {
  var config = {};
  config = require("./config");
  extend(true, options, config);
}



function moveVendorFiles() {
  return merge(vendors.map(function (vendor) {
    console.log(vendor)
    return gulp.src('./node_modules/' + vendor + '/**/*')
      .pipe(gulp.dest('./vendor/' + vendor.replace(/\/.*/, '')));
  }));
};

function drushcr(cb) {
  exec("drush cr", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

function css() {
  return gulp
    .src(options.theme.scss.files)
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./css"))
}

function cleanCss() {
  return del([options.theme.css + "**/*.css", options.theme.css + "**/*.map"], {
    force: true
  });
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(["./js/**/*", "./gulpfile.js"])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(["./js/**/*"])
      .pipe(plumber())
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest("./js/packed"))
  );
}

function watchFiles() {
  gulp.watch('./styles/**/*.scss', gulp.series(css, drushcr))

}


// Clean assets
function clean() {
  return del(["./css/style.css"]);
}


// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(css, js));
const watch = gulp.parallel(css, watchFiles);

const vendorFolders = gulp.parallel(moveVendorFiles)

// export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
exports.moveFolders = vendorFolders
