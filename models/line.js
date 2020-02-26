/**
 * Line
 * 
 * A line can have 3 numbers, and an outcome based on the sum of the numbers
 * 
 */

// var numbers = [];
// var outcome = 0;

// let mongoose = require('mongoose');
// let Schema = mongoose.Schema;

// let line = new Schema({
//     numbers : [Number],
//     outcome : Number
// });

// module.exports = mongoose.model("Line", line);

class Line{
    constructor(numbers){
        this.numbers = numbers;
        this.outcome = 0;
    }

    constructLine(lineNumbers){
    
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
}



