/**
 * 
 * REST interface for a Lottery Ticket System.
 * 
 * NodeJS and ExpressJS for APIs
 * 
 * /ticket POST Create a ticket
 * /ticket GET Return list of tickets
 * /ticket/:id GET Get individual ticket
 * /ticket/:id PUT Amend ticket lines
 * /status/:id PUT Retrieve status of ticket
 * 
 */

var express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var bodyParser = require('body-parser');
const {handleError} = require("./utils/error");

var indexRouter = require('./routes/index');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());

//This is a built-in middleware function in Express. 
//It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended: false}));
// app.use(express.json);
app.use('/', indexRouter);

//catch 404 and forward to error handler
app.use((req, res, next) => {
    next(handleError(err, res));
});

app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;