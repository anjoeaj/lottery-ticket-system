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

    // check('lines').isLength({min:4});
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() })
    // }
    let linesFromRequest = req.body.lines;
    //TODO validation
    //check if lines is in valid format

    let constructedLines = [];
    //construct Line from input
    //call constructLine for each line in the input request
    linesFromRequest.forEach(lineNumbers => {
        let lineAndOutcome = constructLine(lineNumbers);
        if(lineAndOutcome != {}){
            constructedLines.push(lineAndOutcome);
        }
    });

    //DSC query param
    //sort the lines in ASC order based on outcome before inserting to db
    constructedLines.sort((a,b) => a.outcome - b.outcome);
    //TODO confirm a,b??

    // let sampleLine1 = new line(line0);
    let sampleTicket = new lottery_ticket({
        lines : constructedLines,
        status : STATUS_UNCHECKED
    });

    sampleTicket.save().then((doc)=>{
        console.log("Save callback - "+doc);
        //doc.
    });
    //TODO add failure handling

    //TODO send id back
    res.send("generate a ticket");
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

    lottery_ticket.findById(req.params.id, (err, dbResult) => {
        console.log("AMEND LINES");
        if (dbResult.status == config.STATUS_CHECKED){
            //cant amend TODO err
        }
        let lines = dbResult.lines;
        let newLines = req.body.lines;
        
        newLines.forEach(line => {
            let lineObj = constructLine(line);
            lines = lines.concat(lineObj);
        });
        
        lines.sort((a,b) => a.outcome - b.outcome);

        dbResult.lines = lines;
        dbResult.save();
    });
    
    res.send("amend a ticket");
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
        res.send({id: dbResult._id, status : dbResult.status});

    });
    
}