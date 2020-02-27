
const line = require("../models/line");

describe('Compute Outcome', () => {
    it('should return outcome as 10', () => {
        expect(line.computeOutcome([2, 0, 0])).toBe(10)
    })
});

describe('Compute Outcome', () => {
    it('should return outcome as 5', () => {
        expect(line.computeOutcome([2, 2, 2])).toBe(5)
    })
});

describe('Compute Outcome', () => {
    it('should return outcome as 1', () => {
        expect(line.computeOutcome([2, 1, 0])).toBe(1)
    })
});

describe('Compute Outcome', () => {
    it('should return outcome as 0', () => {
        expect(line.computeOutcome([0, 1, 0])).toBe(0)
    })
});