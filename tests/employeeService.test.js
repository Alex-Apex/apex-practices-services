const request = require('supertest');
const { fetchEmployees } = require('../services/employeeService');

describe('Retrieving some employees from the db',()=>{
    it('Should return a list of employees',
    async()=>{
       // TODO assertions go here
       expect(fetchEmployees()).toBeInstanceOf(Array);
    });
});