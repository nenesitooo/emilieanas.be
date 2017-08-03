import gulp from 'gulp'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import simpleExtend from 'postcss-extend'
import nested from 'postcss-nested'
import htmlmin from 'gulp-htmlmin'
import fileinclude from 'gulp-file-include'
import browserSync from 'browser-sync'
import cssvariables from 'postcss-css-variables'
import atImport from 'postcss-import'

browserSync.create()

gulp.task('public', () =>
  gulp.src('./public/**/*')
  .pipe(gulp.dest('./dist'))
)

gulp.task('css', function () {
  var plugins = [
    atImport(),
    simpleExtend(),
    nested,
    cssvariables(),
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
  ]
  return gulp.src('./src/css/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

gulp.task('js', () => {
  gulp.src('dist/js/bundle.js')
    .pipe(browserSync.stream())
})

gulp.task('html', () =>
  gulp.src([
    'src/templates/*.html',
    '!src/templates/_*.html'
  ])
  .pipe(fileinclude())
  .pipe(htmlmin({collapseWhitespace: true, removeComments: false}))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream())
)

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  gulp.start('default')
  gulp.watch([`./src/css/*.css`, `./src/css/*/*.css`], ['css'])
  gulp.watch(`./dist/js/bundle.js`, ['js'])
  gulp.watch(`./src/templates/*.html`, ['html'])
  gulp.watch(`./public/**/*`, ['public'])
})

gulp.task('default', ['public', 'css', 'html'])
