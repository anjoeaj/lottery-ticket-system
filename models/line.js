/**
 * Line Model
 * 
 * A line can have numbers, and an outcome based on the numbers
 * 
 */

let mongoose = require('mongoose');
const utils = require('../utils/utils');
const errors = require("../config/errors");
const config = require("../config/index");
const { HTTPError } = require("../utils/error");

let Schema = mongoose.Schema;

//create a schema for a line. Since no id is required for this sub-document, it is set as false during definition.
let lineSchema = new Schema({
    numbers: [Number],
    outcome: Number
}); 

/**
 * This function pre-calculates the outcome based on the numbers for each line before creating a line and storing on db.
 */
lineSchema.statics.constructLine = function (lineNumbers) {

    if (lineNumbers.length != config.LINE_LENGTH) {
        throw new HTTPError(400, errors.LINE_NUMBERS_COUNT_INVALID);
    }

    //validation to check if num are 0, 1, 2
    let validNumbers = [0, 1, 2];
    lineNumbers.forEach(lineNum => {
        if (!validNumbers.includes(lineNum)) {
            //invalid number present in line
            throw new HTTPError(400, errors.INVALID_LINE_NUMBERS);
        }
    });

    let line = new this({
        numbers: lineNumbers,
        outcome: this.computeOutcome(lineNumbers)
    })

    line.save();

    return line;
}

/**
 * Function to compute the outcome of a line based on the numbers
 */
lineSchema.statics.computeOutcome = function (lineNumbers) {

    let result = 0;
    let sum = utils.arraySum(lineNumbers);

    if (sum == 2) {
        result = 10;
    } else if (utils.doesArrayContainEqualValues(lineNumbers)) {
        result = 5;
    } else if (utils.isFirstElementDifferentFromOthers(lineNumbers)) {
        result = 1;
    }

    return result;
}

module.exports = mongoose.model("Line", lineSchema);