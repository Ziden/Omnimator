var gulp = require('gulp');
var webpack = require('webpack');
var jest = require('jest');
var config = require('./webpack.config.js');
var path = require('path');

gulp.task('test', function(done) {
    var cfg = Object.assign({}, config);
    cfg.plugins = [];
    cfg.watch = false;
    cfg.entry.app.push(path.join(__dirname, 'tests/Joint.tests.js'));
    cfg.output.filename = "bundle.test.js";
    console.log("Packing da stuff");
    webpack(cfg, function() {
        console.log("running da test");


        
        done();
    });
});