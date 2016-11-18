'use strict'

const gulp = require('gulp')
const ts = require('gulp-typescript')

const tsProject = ts.createProject('tsconfig.json')

const globs = {
  ts: 'src/**/*.ts'
}

const dests = {
  main: 'dist'
}

gulp.task('typescript', () => {
  const tsResult = tsProject.src().pipe(tsProject())
  return tsResult.js.pipe(gulp.dest(dests.main))
})

gulp.task('watch', [ 'typescript' ], () => {
  gulp.watch(globs.ts, [ 'typescript' ])
})

gulp.task('default', [ 'watch' ])
