let mongoose = require('mongoose');
let lottery_ticket = require('../models/lottery-ticket');
let line = require('../models/line');
const utils = require('../utils/utils');
const config = require("../config/index");

const { check, validationResult } = require('express-validator');

//TODO
/**
 * (node:13924) DeprecationWarning: current URL string parser is deprecated, 
and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:13924) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
 */
//TODO - move to config
mongoose.connect('mongodb://localhost:27017/simple-lottery-system',  {useNewUrlParser: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function constructLine(lineNumbers){
    
    if (lineNumbers.length != 3){
        //TODO 3 should go in config
        //invalid
        return {};
    }

    //validation to check if num are 0, 1, 2
    //TODO - 4xx err code and err string
    let validNumbers = [0, 1, 2]; //TODO - move to config
    lineNumbers.forEach((lineNum) => {
        if(!validNumbers.includes(lineNum)){
            //invalid number present in line
            return {};
        }
    });
    
    let result = 0;
    if(utils.arraySum(lineNumbers) == 2){
        result = 10;
    }else if(utils.doesArrayContainEqualValues(lineNumbers)){
        result = 5;
    }else if(utils.isFirstElementDifferentFromOthers(lineNumbers)){
        result = 1;
    }

    //construct line
    let line = {
        numbers : lineNumbers,
        outcome : result
    }

    return line;
}

exports.ticketList = (req, res, next) => {
    console.log("get all");
    let result = {};
    // lottery_ticket.all().then((err, data) => {
    //     result = data;    
    //     console.log(result);
    // });
    lottery_ticket.find((err, dbResult) => {
        res.send({tickets : dbResult});
    })
    
}

exports.generateTicket = (req, res, next) => {

    let linesFromRequest = req.body.lines;
    let lotteryTicket = lottery_ticket.generateTicket(linesFromRequest);
    res.status(200);
    res.send(lotteryTicket);
    //TODO add failure handling

    //TODO send id back
    
}

exports.getTicket = (req, res, next) => {
    console.log("get a particular ticket");
    //read the ticket
    lottery_ticket.findById(req.params.id, (err, dbResult) => {
        res.send({ticket : dbResult});
    });
    // res.send("get a ticket");
}

exports.amendTicket = (req, res, next) => {
    console.log("amenddd");
    //read the ticket from the database
    //add new lines
    //sort the lines
    //save to db

    lottery_ticket.findById(req.params.id, (err, dbResult) => {
        console.log("AMEND LINES");
        if (dbResult.status == config.STATUS_CHECKED){
            //cant amend TODO err
        }

        let newLines = req.body.lines;
        dbResult.amendTicket(newLines);

        delete dbResult.lines._id;

        res.status(200);
        res.send(dbResult);
    });
    
    
}

exports.ticketStatus = (req, res, next) => {
    //retrieve ticket from database, 
    //read the status value;
    //set status to false
    lottery_ticket.findById(req.params.id, (err, dbResult) => {
        let currentStatus = dbResult.status;
        if (currentStatus == config.STATUS_UNCHECKED){
            //cant amend TODO err
            dbResult.status = config.STATUS_CHECKED;
            dbResult.save();
        }
        res.send({id: dbResult._id, status : currentStatus});

    });
    
}