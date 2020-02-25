/**
 * 
 * Lottery Ticket Web Service
 * 
 */

var express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var bodyParser = require('body-parser');

// delete require.cache[require.resolve('./routes/index')]
var indexRouter = require('./routes/index');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());

//This is a built-in middleware function in Express. 
//It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended: false}));
app.use('/', indexRouter);

//catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    //TODO res.send()
});

module.exports = app;