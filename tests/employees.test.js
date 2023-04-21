const request = require('supertest');
const { app, server } = require('../app');


describe('GET /employees', () => {
      
    afterAll((done) => {
      server.close(() => {
        console.log('Test server closed');
        done();
      });
    });

    it('Should return a list of employees',async()=>{    
        const res = await request(app).get('/employees');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        //TODO You can add more assertions here
    });
});
  