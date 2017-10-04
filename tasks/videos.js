const gulp             = require('gulp');
const clean            = require('gulp-clean');
const eventStream      = require('event-stream');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

const cleanVideos = () => {
  return gulp.src(config.dest.videos, { read: false })
    .pipe(clean());
};

const copyVideos = () => {
  return gulp.src(`${config.src.videos}${config.selectors.videos}`)
    .pipe(gulp.dest(config.dest.videos));
};

const buildVideos = () => {
  return eventStream.merge(
    cleanVideos(),
    copyVideos()
  )
    .pipe(browserSync.stream());
};

gulp.task('build-videos', buildVideos);
module.exports = buildVideos;
