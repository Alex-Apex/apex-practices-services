const { poolPromise } = require('../db');


/**
 * Gets the employees from the db
 */
async function fetchEmployees() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Employees');
    return result.recordset;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
}

module.exports = {
  fetchEmployees,
};
