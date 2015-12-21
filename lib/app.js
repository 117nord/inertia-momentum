/*
    The app module exposes our express.js app.
*/

/*jslint
node, es6, for, fudge, maxlen: 120
*/

/*property
    error, exports, get, join, json, message, render, static, status, use
*/

'use strict';

let jshintUnused;
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let express = require('express');

let app = express();

jshintUnused = jshintUnused || null;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    jshintUnused = req;
    jshintUnused = res;

    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        jshintUnused = req;
        jshintUnused = next;

        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    jshintUnused = req;
    jshintUnused = next;

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
