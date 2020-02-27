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
var bodyParser = require('body-parser');
const {handleError} = require("./utils/error");

var indexRouter = require('./routes/index');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//the api routes are stored in indexRouter
app.use('/', indexRouter);

//catch errors and forward to error handler
app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;