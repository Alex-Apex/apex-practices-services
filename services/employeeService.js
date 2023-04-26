const sql = require('mssql');
const queries = require('../resources/queries');
const {appConnectionPoolPromise} = require('../db');
let pool;
/**
 * Gets the employees from the db
 */
async function fetchEmployees() {
  try {
    pool = await appConnectionPoolPromise.connect();
    const result = await pool.request().query(queries.GET_ALL_EMPLOYEES);
    return result.recordset;
  } catch (error) {
    console.error('fetchEmployees Exception:', error);
    throw error;
  } finally {
    await pool.close();
  }
}

/**
 * Gets all employees who are currently on bench
 * @return {Array} promise for benched employees
 */
async function fetchBenchReport() {
  try {
    pool = await appConnectionPoolPromise.connect();
    const result = await pool.request().query(queries.GET_BENCH_REPORT);
    return result.recordset;
  } catch (exception) {
    console.error('Error while fetching benched employees: ', exception);
    throw exception;
  } finally {
    await pool.close();
  }
}

/**
 * Inserts a new employee into the database.
 * @param {object} employee - The employee object containing
 * details to be inserted.
 * @return {Promise<object>} - The inserted employee object.
 */
async function insertEmployee(employee) {
  try {
    const pool = await appConnectionPoolPromise.connect();
    const request = pool.request();

    request
        .input('EmployeeName', sql.NVarChar, employee.employeeName)
        .input('EmployeeTitle', sql.NVarChar, employee.employeeTitle)
        .input('ApexUsername', sql.NVarChar, employee.apexUsername)
        .input('SupervisorName', sql.NVarChar, employee.supervisorName)
        .input('PracticeName', sql.NVarChar, employee.practiceName)
        .input('PoolId', sql.NVarChar, employee.poolId);

    const result = await request.execute('InsertEmployee');
    return result.recordset[0];
  } catch (error) {
    console.error('Error inserting employee:', error);
    throw error;
  }
}

module.exports = {
  fetchEmployees,
  fetchBenchReport,
  insertEmployee,
};
