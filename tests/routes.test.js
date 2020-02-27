

const request = require('supertest');
const app = require('../app');

describe('Post Endpoints', () => {
    it('should create a new lottery ticket', async () => {
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
            })
        expect(res.statusCode).toEqual(201)
    });

    it('should not create a new lottery ticket when lines has invalid values', async () => {
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
        expect(res.text).toContain("Line contains numbers other that are not permitted")
    });

    it('should not create a new lottery ticket when lines has invalid length', async () => {
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
        expect(res.text).toContain("Line number length is more or less than the required length")
    });
});


describe('Get all lottery tickets', () => {
    it('should get all lottery tickets', async () => {
        const res = await request(app)
            .get('/ticket')
            .send()
        expect(res.statusCode).toEqual(200);
        expect(res.body.tickets).toBeInstanceOf(Array);
    })
});

describe('Get an individual lottery ticket', () => {
    it('should get one lottery ticket', async () => {
        const res = await request(app)
            .get('/ticket/5e571770b87d4186507bb4ee')
            .send()
        expect(res.statusCode).toEqual(200)
    })
});

describe('Amend a lottery ticket', () => {
    it('add 2 new lines to the lottery ticket', async () => {
        const res = await request(app)
            .put('/ticket/5e5796308724e4cd1452dee3')
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
        expect(res.statusCode).toEqual(201)
    });

    it('should check status once', async () => {
        const res = await request(app)
            .put('/status/5e5796308724e4cd1452dee3')
            .send()
        expect(res.statusCode).toEqual(200)
    })

    it('should fail and return 400 when tried to amend again after checking status', async () => {
        const res = await request(app)
            .put('/ticket/5e5796308724e4cd1452dee3')
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
        expect(res.statusCode).toEqual(400)
    });
});

describe('Get status endpoint', () => {
    it('should check status', async () => {
        const res = await request(app)
            .put('/status/5e55380fb33a4d7a48bfc18a')
            .send()
        expect(res.statusCode).toEqual(200)
    })
});

