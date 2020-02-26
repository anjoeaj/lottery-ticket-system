/**
 * Model for the Lottery Ticket
 * 
 * List of lines
 * Status of the ticket
 * 
 */

 let mongoose = require('mongoose');
 let Schema = mongoose.Schema;
 let line = require('./line');

 let lotteryTicket = new Schema({
     lines : [
        {
            //type: mongoose.Schema.Types.ObjectId,
            //ref: "Line",
            numbers : [Number],
            outcome : Number
        }
     ],
     status: String
 });

 module.exports = mongoose.model("lottery_ticket", lotteryTicket);