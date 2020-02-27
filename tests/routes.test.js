

const request = require('supertest');
const app = require('../app');
let ticketId = "";

describe('Post Endpoints', () => {
    it('should create a new lottery ticket', async (done) => {
        const res = await request(app)
            .post('/ticket')
            .send({
                "lines": [
                    [
                        0,
                        1,
                        1
                    ],
                    [
                        0,
                        0,
                        0
                    ]
                ]
            });
        ticketId = res.body._id;
        expect(res.statusCode).toEqual(201)
        done();
        //save ticket id for testing later

    });

    it('should not create a new lottery ticket when lines has invalid values', async (done) => {
        const res = await request(app)
            .post('/ticket')
            .send({
                "lines": [
                    [
                        0,
                        5,
                        1
                    ],
                    [
                        0,
                        0,
                        0
                    ]
                ]
            })
        expect(res.statusCode).toEqual(400);
        expect(res.text).toContain("Line contains numbers other that are not permitted");
        done();
    });

    it('should not create a new lottery ticket when lines has invalid length', async (done) => {
        const res = await request(app)
            .post('/ticket')
            .send({
                "lines": [
                    [
                        0,
                        2,
                        1,
                        2,
                        2,
                        2
                    ],
                    [
                        0,
                        0,
                        0
                    ]
                ]
            })
        expect(res.statusCode).toEqual(400);
        expect(res.text).toContain("Line number length is more or less than the required length");
        done();
    });
});


describe('Get all lottery tickets', () => {
    it('should get all lottery tickets', async (done) => {
        const res = await request(app)
            .get('/ticket')
            .send()
        expect(res.statusCode).toEqual(200);
        expect(res.body.tickets).toBeInstanceOf(Array);
        done();
    })
});

describe('Get an individual lottery ticket', () => {
    it('should get one lottery ticket', async (done) => {
        const res = await request(app)
            .get('/ticket/'+ticketId)
            .send()
        expect(res.statusCode).toEqual(200);
        done();
    })
});

describe('Amend a lottery ticket', () => {
    it('add 2 new lines to the lottery ticket', async (done) => {
        const res = await request(app)
            .put('/ticket/'+ticketId)
            .send({
                "lines": [
                    [
                        1,
                        1,
                        1
                    ],
                    [
                        0,
                        2,
                        0
                    ]
                ]
            })
        expect(res.statusCode).toEqual(201);
        done();
    });

    it('should check status once', async (done) => {
        const res = await request(app)
            .put('/status/'+ticketId)
            .send()
        expect(res.statusCode).toEqual(200);
        done();
    })

    it('should fail and return 400 when tried to amend again after checking status', async (done) => {
        const res = await request(app)
            .put('/ticket/'+ticketId)
            .send({
                "lines": [
                    [
                        1,
                        1,
                        1
                    ],
                    [
                        0,
                        2,
                        0
                    ]
                ]
            })
        expect(res.statusCode).toEqual(400);
        done();
    });
});

// describe('Get status endpoint', () => {
//     it('should check status', async () => {
//         const res = await request(app)
//             .put('/status/5e55380fb33a4d7a48bfc18a')
//             .send()
//         expect(res.statusCode).toEqual(200)
//     })
// });

