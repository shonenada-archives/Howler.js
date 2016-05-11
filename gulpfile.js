var gulp = require('gulp');
var webpack = require('gulp-webpack');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var path = require('path');
var nib = require('nib');
var named = require('vinyl-named');
var del = require('del');
var browserSync = require('browser-sync');
var argv = require('yargs').argv;

var project = {
  name: 'Howler',
  src: 'src/',
  dist: 'dist/',
  webpack: require('./webpack.config'),
};

var scripts = {
  src: project.src + '/scripts',
  dist: project.dist + '/static/scripts',
  exts: ['js', 'jsx'],
};

var styles = {
  src: project.src + '/styles',
  dist: project.dist + '/static/styles',
  exts: ['css', 'styl'],
};

var html = {
  src: '{' + project.src + ',' + project.src + '/templates}',
  exts: ['html', 'htm'],
  dist: project.dist,
};

var images = {
  src: project.src + 'images',
  dist: project.dist + 'images',
  exts: ['jpg', 'png', 'gif'],
};

var assets = {
  dirs: [].concat(scripts.src, styles.src),
  exts: [].concat(scripts.exts, styles.exts),
  glob: function (bundle) {
    if (bundle) {
      return bundle.src + '/**/*.{' + bundle.exts.join(',') + '}';
    } else {
      dirs = [].concat(assets.dirs);
      exts = [].concat(assets.exts);
      return '{' + dirs.join(',') + '/**/*.{' + exts.join(',') + '}}';
    }
  },
};

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('build', ['collect', 'style', 'webpack']);

gulp.task('clean', ['clean:dist']);

gulp.task('watch', ['build'], function() {
  gulp.start('browser-sync');
  gulp.watch(assets.glob(styles), ['style']);
  gulp.watch(assets.glob(scripts), ['webpack']);
  gulp.watch(images.src + '/**/*.{' + images.exts.join(',') + '}', ['collect:images', 'webpack']);
  gulp.watch(html.src + '/**/*.{' + html.exts.join(',') + '}', ['collect:html', 'webpack']);
});

gulp.task('webpack', function() {
  gulp.src(assets.glob(scripts))
      .pipe(plumber())
      .pipe(named(function(file) {
        var dirname = path.basename(path.dirname(file.path));
        var filename = path.basename(file.path, path.extname(file.path));
        path.join(dirname, filename);
      }))
      .pipe(webpack(project.webpack))
      .pipe(gulp.dest(scripts.dist))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('style', function() {
  var options = {
    usb: [nib()],
    compress: !argv.debug,
    sourcemap: argv.debug ? { inline: argv.debug } : void 0
  };
  gulp.src(assets.glob(styles))
      .pipe(plumber())
      .pipe(stylus(options))
      .pipe(gulp.dest(styles.dist))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('collect', ['collect:image', 'collect:html']);

gulp.task('collect:image', function() {
  gulp.src(images.src + '/**/*.{' + images.exts.join(',') + '}')
      .pipe(gulp.dest(images.dist));
});

gulp.task('collect:html', function() {
  gulp.src(html.src + '/**/*.{' + html.exts.join(',') + '}')
      .pipe(gulp.dest(html.dist));
});

gulp.task('browser-sync', function() {
  var port = argv.port || process.env.PORT;
  browserSync({
    port: port,
    open: false,
    server: { baseDir: [project.dist] },
  });
});

gulp.task('deploy', function() {
});

gulp.task('clean:dist', function(done) {
  del([project.dist], done);
});
