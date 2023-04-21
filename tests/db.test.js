const request = require('supertest');
const { appConnectionPoolPromise } = require('../db');

describe('Database connection', () => {
    beforeAll(async () => {
        // Attempt to connect to the database before running the tests
        pool = await appConnectionPoolPromise.connect();
    });
    
    // Close the connection pool after tests are done
    afterAll(async () => {
      if (pool) {
        await pool.close();
      }
     });

  test('should connect to the SQL Server database', async () => {
    try {
      // Run a simple query to check if the connection is working
      const result = await pool.request().query('SELECT 1 AS TestValue');

      // Check if the query result matches the expected value
      expect(result.recordset[0].TestValue).toBe(1);
    } catch (error) {
      // If there's an error, fail the test
      fail(`Database connection failed: ${error}`);
    }
  });
});
