const request = require('supertest');
const { app, server } = require('../app');
const { appConnectionPoolPromise } = require('../db');

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

describe ('POST /employees', () => {
    afterAll(async () => {
        return new Promise((resolve) => {
          server.close(async () => {
            console.log('Testing PUT server, now closed');
            
            // Close the database connection
            await appConnectionPoolPromise.close();
            
            resolve();
          });
        });
      });
      
      

    it('Should insert a new employee in the DB and return 201 and the inserted object with the new ID', async() => {
        
        const newEmployee = {
            employeeName:'Test Employee',
            employeeTitle: 'Test Employee',
            apexUsername:'ttest',
            supervisorName: 'Alejandro Gomez',
            practiceName:'UX',
            poolId:'MDC - Test Practice Pool'         
        };
        
        const res = await request(app).post('/employees').send(newEmployee);
        console.log("res.body: ", res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual(newEmployee.employeeName); // Just validating this is the same employee object returning
    }, 10000);
});
  