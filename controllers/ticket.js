let mongoose = require('mongoose');
let lottery_ticket = require('../models/lottery-ticket');
let line = require('../models/line');
const utils = require('../utils/utils');
const config = require("../config/index");
const errors = require("../config/errors");
const { HTTPErrorHandler } = require("../utils/error");

const { check, validationResult } = require('express-validator');

mongoose.connect(config.DB_URL, { useNewUrlParser: true }).
    catch((err) => {
        console.log('MongoDB connection error: ' + err);
        process.exit(1);
    });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**
 * Function ticketList reads all lottery tickets from the db
 *  GET       /ticket        Return list of tickets
 */
exports.ticketList = (req, res, next) => {

    lottery_ticket.find((err, dbResult) => {
        if (!dbResult) {
            throw new HTTPErrorHandler(404, errors.NO_TICKETS_FOUND);
        }
        res.status(200);
        res.send({ tickets: dbResult });
    })

}

/**
 * Creates a new ticket and sends it back to the user
 * POST       /ticket        Create a ticket
 */
exports.generateTicket = (req, res, next) => {

    let linesFromRequest = req.body.lines;
    if (linesFromRequest && linesFromRequest.length >= 1) {
        let lotteryTicket = lottery_ticket.generateTicket(linesFromRequest);
        res.status(201);
        res.send(lotteryTicket);
    }
    else {
        throw new HTTPErrorHandler(400, errors.EMPTY_LINES);
    }

}

/**
 * Queries the db for a lottery ticket based on the id and sends it back to the user
 * GET       /ticket/:id        Get individual ticket
 */
exports.getTicket = (req, res, next) => {

    lottery_ticket.findById(req.params.id, (err, dbResult) => {
        if (!dbResult) throw new HTTPErrorHandler(404, errors.TICKET_NOT_FOUND);

        res.send({ ticket: dbResult });
    });
}

/**
 * Amends an existing ticket with additional lines, saves to DB and sends it back to the user
 * POST       /ticket/:id        Amend ticket lines
 */
exports.amendTicket = (req, res, next) => {

    lottery_ticket.findById(req.params.id, (err, dbResult) => {

        if (!dbResult) throw new HTTPErrorHandler(404, errors.TICKET_NOT_FOUND);
        if (dbResult.status == config.STATUS_CHECKED) throw new HTTPErrorHandler(404, errors.STATUS_CHECKED);

        let newLines = req.body.lines;
        if (!newLines) throw new HTTPErrorHandler(404, errors.EMPTY_LINES);

        dbResult.amendTicket(newLines);

        res.status(201);
        res.send(dbResult);
    });
}

/**
 * Retrieve status of a ticket and sends it back to the user
 * POST       /status/:d        Retrieve status of a ticket
 */
exports.ticketStatus = (req, res, next) => {

    lottery_ticket.findById(req.params.id, (err, dbResult) => {

        if (!dbResult) throw new HTTPErrorHandler(404, errors.TICKET_NOT_FOUND);
        let currentStatus = dbResult.status;
        if (currentStatus == config.STATUS_UNCHECKED) {
            //dbResult.status = config.STATUS_CHECKED;
            dbResult.checkStatus();
            //dbResult.save();
        }
        res.send({ id: dbResult._id, status: currentStatus });
    });

}