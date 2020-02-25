let mongoose = require('mongoose');
let lottery_ticket = require('../models/lottery-ticket');
let line = require('../models/line');
const utils = require('../utils/utils');

//TODO
/**
 * (node:13924) DeprecationWarning: current URL string parser is deprecated, 
and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:13924) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
 */
mongoose.connect('mongodb://localhost:27017/simple-lottery-system',  {useNewUrlParser: true});

function constructLine(lineNumbers){
    
    if (lineNumbers.length != 3){
        //TODO 3 should go in config
        //invalid
        return {};
    }

    //validation to check if num are 0, 1, 2
    let validNumbers = [0, 1, 2];
    lineNumbers.forEach(lineNum => {
        if(!validNumbers.includes(lineNum)){
            //invalid number present in line
            return {};
        }
    });

    let sum = utils.arraySum(lineNumbers);
    let result = 0;
    if(sum == 2){
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



exports.ticket_list = (req, res, next) => {
    console.log("get all");
    let result = {};
    lottery_ticket.all().then((err, data) => {
        result = data;    
        console.log(result);
    });
    res.send(result);
}

exports.generate_ticket = (req, res, next) => {
    // let line0 = {
    //     numbers : [2,0,1],
    //     outcome : 0
    // }
    // console.log(req);
    let linesFromRequest = req.body.data.lines;
    // linesFromRequest = JSON.parse(linesFromRequest.data);
    // linesFromRequest = JSON.parse(linesFromRequest.lines);
    //TODO validation

    let constructedLines = [];
    //construct Line from input
    //call constructLine for each line in the input request
    linesFromRequest.forEach(lineNumbers => {
        let lineAndOutcome = constructLine(lineNumbers);
        if(lineAndOutcome != {}){
            constructedLines.push(lineAndOutcome);
        }
    });

    // let sampleLine1 = new line(line0);
    let sampleTicket = new lottery_ticket({
        lines : constructedLines,
        status : false
    });

    sampleTicket.save().then((doc)=>{
        console.log("Save callback - "+doc);
        //doc.
    });
    //TODO add failure handling

    res.send("generate a ticket");
}

exports.get_ticket = (req, res, next) => {
    console.log("get a particular ticket");
    //read the ticket
    res.send("get a ticket");
}

exports.amend_ticket = (req, res, next) => {
    console.log("amenddd");
    //read the ticket from the database
    //add new lines
    //sort the lines

    
    res.send("amend a ticket");
}

exports.ticket_status = (req, res, next) => {
    //retrieve ticket from database, 
    //read the status value;
    //set status to false

    res.send("check ticket status");
}