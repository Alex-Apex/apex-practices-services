const { appConnectionPoolPromise } = require('../db');
let pool;
/**
 * Gets the employees from the db
 */
async function fetchEmployees() {
  try {
    pool = await appConnectionPoolPromise.connect();
    let result = await pool.request().query('SELECT * FROM Employees'); //TODO Move all queries to a resources file
    return result.recordset;
  } catch (error) {
    console.error('fetchEmployees Exception:', error);
    throw error;
  } finally {
    await pool.close();
  }
}

/**
 * Allows the insert or update of certain employees.
 * @param {Sh} emp 
 */
async function upsertEmployee(emp){
// TODO  create this TDD style
}

module.exports = {
  fetchEmployees,
};
