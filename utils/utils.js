/**
 * Utility functions
 */

const config = require('../config/index');

exports.arraySum = (arr) => {
    let sum = 0;
    
    arr.forEach(element => {
        sum += element;
    });

    return sum;
};

exports.doesArrayContainEqualValues = (arr) => {
    //get the first element from array
    let compareWith = arr.length > 0 ? arr[0] : null;
    if(compareWith == null){
        return false;
    }

    //compare the first element with the rest of the elements until an inequality is found
    for (let i = 1; i < arr.length; i++){
        if(compareWith != arr[i]){
            return false;
        }
    }

    return true;
}

exports.isFirstElementDifferentFromOthers = (arr) => {
    //get the first element from array
    let firstElem = arr.length == config.LINE_LENGTH ? arr[0] : null;
    if(firstElem == null){
        return false;
    }

    //check if first element is different from both 2nd and 3rd element`
    if(arr[1] != firstElem && arr[2] != firstElem){
        return true;
    }

    return false;
}