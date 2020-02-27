let lottery_ticket = require('../models/lottery-ticket');

describe('Generate lottery ticket', () => {
    it('should create 1 lottery ticket with 2 lines', () => {
        let lines = [[0, 0, 0], [1, 0, 0]];
        let lotteryTicket = lottery_ticket.generateTicket(lines);
        expect(lotteryTicket).toBeDefined();
        expect(lotteryTicket._id).toBeDefined();
        expect(lotteryTicket.lines).toHaveLength(lines.length);
    });

    it('should create 1 lottery ticket with 4 lines', () => {
        let lines = [[0, 0, 0], [1, 0, 0], [0, 2, 0], [1, 0, 0]];
        let lotteryTicket = lottery_ticket.generateTicket(lines);
        expect(lotteryTicket).toBeDefined();
        expect(lotteryTicket._id).toBeDefined();
        expect(lotteryTicket.lines).toHaveLength(lines.length);
    });

    it('should create 1 lottery ticket with 6 lines', () => {
        let lines = [[0, 0, 0], [1, 0, 0], [0, 2, 0], [1, 0, 0], [0, 1, 0], [1, 2, 0]];
        let lotteryTicket = lottery_ticket.generateTicket(lines);
        expect(lotteryTicket).toBeDefined();
        expect(lotteryTicket._id).toBeDefined();
        expect(lotteryTicket.lines).toHaveLength(lines.length);
    });
});

describe('Amend a lottery ticket', () => {
    it('should create 1 lottery ticket with 2 lines', () => {
        let lines = [[0, 0, 0], [1, 0, 0]];
        let lotteryTicket = lottery_ticket.generateTicket(lines);
        let originalLength = lotteryTicket.lines.length;
        lotteryTicket.amendTicket(lines);
        expect(lotteryTicket).toBeDefined();
        expect(lotteryTicket._id).toBeDefined();
        expect(lotteryTicket.lines).toHaveLength(lines.length + originalLength);
    });

    // it('should create 1 lottery ticket with 4 lines', () => {
    //     let lines = [[0, 0, 0], [1, 0, 0], [0, 2, 0], [1, 0, 0]];
    //     let lotteryTicket = lottery_ticket.amendTicket(lines);
    //     expect(lotteryTicket._id).toBeDefined();
    //     expect(lotteryTicket._id).toBeDefined();
    //     expect(lotteryTicket.lines).toHaveLength(lines.length);
    // });

    // it('should create 1 lottery ticket with 6 lines', () => {
    //     let lines = [[0, 0, 0], [1, 0, 0], [0, 2, 0], [1, 0, 0], [0, 1, 0], [1, 2, 0]];
    //     let lotteryTicket = lottery_ticket.amendTicket(lines);
    //     expect(lotteryTicket._id).toBeDefined();
    //     expect(lotteryTicket._id).toBeDefined();
    //     expect(lotteryTicket.lines).toHaveLength(lines.length);
    // });
})