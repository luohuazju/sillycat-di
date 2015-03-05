/*jslint node: true */
'use strict';

//gulp &  plugins
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var del = require('del');
var artifactoryUpload = require('gulp-artifactory-upload');

var project = {
  name    : 'sillycat-di',
  version : '1.0',
}

var artifactory = {
  url : 'http://ubuntu-pilot:8080/artifactory/libs-release-local/',
  username : 'deployer',
  password : 'deployer',
  path : 'com/sillycat/sillycat-di/'
}

var paths = {
  main    : 'index.js',
  tests   : 'test/**/*.js',
  sources : [ '**/*.js', '!node_modules/**', '!gulpfile.js', '!dist/**'],
  deploys : [ '**/*.*',
              '!gulpfile.js',
              '!package.json',
              '!README.md',
              '!dist/**',
              '!test/**',
              '!node_modules/gulp/**',
              '!node_modules/gulp-*/**',
              '!node_modules/del/**'],
};

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('dist', function() {
    gulp.src(paths.deploys)
    .pipe(tar(project.name + '-' + project.version + '.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('./dist/'));
});

gulp.task( 'deploy', function() {
    return gulp.src('./dist/' + project.name + '-' + project.version + '.tar.gz')
           .pipe( artifactoryUpload( {
                url: artifactory.url + artifactory.path,
                username: artifactory.username, // optional
                password: artifactory.password, // optional,
                rename: function( filename ) { return filename; } // optional
            } ) )
           .on('error', gutil.log);
} );

// lint all of our js source files
gulp.task('lint', function (){
  return gulp.src(paths.sources)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// run mocha tests
gulp.task('test', function (){
  return gulp.src(paths.tests, {read: false})
  .pipe(mocha({reporter: 'list'}))
  .on('error', gutil.log);
});





