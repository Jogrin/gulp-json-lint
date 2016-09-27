'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var PluginError = require('gulp-util').PluginError;
var jsonlint = require('gulp-jsonlint');
var jutil = require('json5-utils');
var mapStream = require('map-stream');

//Module name const
const PLUGIN_NAME = 'gulp-json-lint';

/*function throwError(path, message) {
    gutil.log(gutil.colors.red('JSONLint Error:'));
    gutil.log(gutil.colors.red('Path: ' + gutil.colors.white(path)));
    gutil.log(gutil.colors.red('Message: ' + gutil.colors.white(message)));
    process.exit(-1);
}*/

function gulpJsonLint() {
    return mapStream(function (file, callback) {
        var content = file.contents;
        var error;
        if (content) {
            try {
                jutil.parse(String(content), { duplicate_keys: 'throw' });
            } catch (e) {
                error = new PluginError('gulp-json-lint', {
                    name: 'JSON Lint Error',
                    filename: file.path,
                    message: e
                });
                //throwError(file.path, error);
            }
        }
        callback(error, file);
    });
}

//Exporting Module
module.exports = gulpJsonLint;
