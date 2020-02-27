

// const request = require('supertest');
// const app = require('../app');

// beforeAll(() => {
//     return initializeCityDatabase();
// });

// afterAll(() => {
//     return clearCityDatabase();
// });


// describe('Post Endpoints', () => {
//     it('should create a new post', async () => {
//         const res = await request(app)
//             .post('/ticket')
//             .send({
//                 "lines": [
//                     [
//                         0,
//                         1,
//                         1
//                     ],
//                     [
//                         0,
//                         0,
//                         0
//                     ]
//                 ]
//             })
//         expect(res.statusCode).toEqual(201)
//         //expect(res.body).toHaveProperty('post')
//     })
// });

// describe('Get lottery ticket endpoints', () => {
//     it('should get all lottery tickets', async () => {
//         const res = await request(app)
//             .get('/ticket')
//             .send()
//         expect(res.statusCode).toEqual(200)
//         //expect(res.body).toHaveProperty('post')
//     })
// });

// describe('Get status endpoint', () => {
//     it('should get all lottery tickets', async () => {
//         const res = await request(app)
//             .get('/status/5e56f13b8c51b457d827b553')
//             .send()
//         expect(res.statusCode).toEqual(200)
//         //expect(res.body).toHaveProperty('post')
//     })
// });