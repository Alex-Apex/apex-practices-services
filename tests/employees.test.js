const request = require('supertest');
const app = require('../app');

describe('GET /employees',()=>{
    it('Should return a list of employees',async()=>{
        const res = await request(app).get('/employees');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        //TODO You can add more assertions here
    });
});