/**
 * Line
 * 
 * A line can have 3 numbers, and an outcome based on the sum of the numbers
 * 
 */

var numbers = [];
var outcome = 0;

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let line = new Schema({
    numbers : Number,
    outcome : Number
});

module.exports = mongoose.model("Line", line);

