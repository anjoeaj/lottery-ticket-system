/**
 * Line
 * 
 * A line can have 3 numbers, and an outcome based on the numbers
 * 
 */

let mongoose = require('mongoose');
const utils = require('../utils/utils');
let Schema = mongoose.Schema;

let lineSchema = new Schema({
    numbers : [Number],
    outcome : Number
});

/**
 * This function pre-calculates the outcome based on the numbers for each line before creating a line and storing on db.
 */
lineSchema.statics.constructLine = function (lineNumbers) {
    
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

    let line = new this({
        numbers : lineNumbers,
        outcome : result
    })

    line.save();

    return line;
}

module.exports = mongoose.model("Line", lineSchema);

// class Line{
//     constructor(numbers){
//         numbers = numbers;
//         this.outcome = 0;
//         this.constructLine();
//     }

//     constructLine(){
    
//         if (numbers.length != 3){
//             //TODO 3 should go in config
//             //invalid
//             return {};
//         }
    
//         //validation to check if num are 0, 1, 2
//         let validNumbers = [0, 1, 2];
//         numbers.forEach(lineNum => {
//             if(!validNumbers.includes(lineNum)){
//                 //invalid number present in line
//                 return {};
//             }
//         });
    
//         let sum = utils.arraySum(numbers);
//         if(sum == 2){
//             this.outcome = 10;
//         }else if(utils.doesArrayContainEqualValues(numbers)){
//             this.outcome = 5;
//         }else if(utils.isFirstElementDifferentFromOthers(numbers)){
//             this.outcome = 1;
//         }

//         return this;
//     }
// }

// module.exports = Line;

