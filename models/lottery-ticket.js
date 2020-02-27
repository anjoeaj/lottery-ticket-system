/**
 * Model for the Lottery Ticket
 * 
 * List of lines
 * Status of the ticket
 * 
 */

let mongoose = require('mongoose');
let line = require('./line');
const config = require("../config/index");

let Schema = mongoose.Schema;

let lotteryTicketSchema = new Schema({
    lines: [line.schema],
    status: String
});

lotteryTicketSchema.statics.generateTicket = function (lineNumbers) {
    let lotteryTicket = new this({
        lines: [],
        status: config.STATUS_UNCHECKED
    });

    //TODO validation
    //check if lines is in valid format

    let constructedLines = [];
    //construct Line from input
    //call constructLine for each line in the input request
    lineNumbers.forEach(lineNumbers => {
        let lineAndOutcome = line.constructLine(lineNumbers);
        if (lineAndOutcome != {}) {
            constructedLines.push(lineAndOutcome);
        }
    });

    //DSC query param
    //sort the lines in ASC order based on outcome before inserting to db
    constructedLines.sort((a, b) => a.outcome - b.outcome);

    lotteryTicket.lines = constructedLines;
    lotteryTicket.save().then((err, doc) => {
        console.log("Save callback - " + doc);
        //doc.
    });

    return lotteryTicket;
}

lotteryTicketSchema.methods.amendTicket = function (newLines) {

    newLines.forEach(newLine => {
        let lineObj = line.constructLine(newLine);
        this.lines = this.lines.concat(lineObj);
    });

    this.lines.sort((a, b) => a.outcome - b.outcome);
    this.save();
}

module.exports = mongoose.model("lottery_ticket", lotteryTicketSchema);