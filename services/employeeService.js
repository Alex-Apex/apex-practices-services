const sql = require('mssql');
const queries = require('../resources/queries');
const {appConnectionPoolPromise} = require('../db');
let pool;
/**
 * Gets the employees from the db
 */
async function fetchEmployees(onlyActive) {
  try {
    pool = await appConnectionPoolPromise.connect();
    const result = await pool.request().query(onlyActive? queries.GET_ALL_ACTIVE_EMPLOYEES: queries.GET_ALL_EMPLOYEES);
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
 * 
 * @returns 
 */
async function fetchFridaysChampions() {
  try {
    pool = await appConnectionPoolPromise.connect();
    const result = await pool.request().query(queries.GET_FRIDAY_CHAMPIONS_LEADERBOARD);
    return result.recordset;
  } catch(exception) {
    console.error('Error while trying to get the Champions Friday Roster:', exception);
    throw exception;
  } finally {
    await pool.close();
  }
}


/**
 * 
 */
async function fetchPerformanceEventCatalog() {
  try {
    pool = await appConnectionPoolPromise.connect();
    const result = await pool.request().query(queries.GET_EMPLOYEE_MANAGEMENT_EVENTS);
    return result.recordset;
  } catch(exception) {
    console.log('Failed to retrieve the performance events catalog from DB', exception);
    throw exception;
  }finally {
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

/**
 * Inserts the new bench event into the db
 * @param {*} benchEvent 
 */
async function insertBenchEvent (benchEvent) {
  try {
    const pool = await appConnectionPoolPromise.connect();
    const request = pool.request();
    
    request
        .input('EmployeeID', sql.Int, benchEvent.employeeId)
        .input('BenchStatusModeName', sql.NVarChar, benchEvent.statusModeName)        
        .input('Notes', sql.Text, benchEvent.notes);

    const result = await request.execute('InsertBenchManagementEvent');
    return result.recordset[0];
  } catch (error) {
    console.error('Error inserting Bench Event:', error);
    throw error;
  }
};

/**
 * Receives a Performance event for a particular employee and 
 * inserts it in the db
 * @param {*} EmployeePerformanceEvent 
 */
async function insertEmployeePerformanceEvent(event) {
  try{
    const pool = await appConnectionPoolPromise.connect();
    const request = pool.request();
    request
          .input('EmployeeId', sql.Int, event.employeeId)
          .input('PerformanceEventTypeId', sql.Int, event.performanceEventTypeId)
          .input('Notes', sql.VarChar(sql.MAX), event.notes);
    if(event.dateOccurred !== null && event.dateOccurred !== '') {
      console.log('Event Date Occurred:',event.dateOccurred);
      request.input('DateOccurred',sql.Date, event.dateOccurred);
    }
    const result = await request.execute('InsertEmployeePerformanceEvent');
    return result.recordset[0];
  } catch(exception) {
    console.error('Error while trying to insert performance evente', exception);
    throw error;
  }
}

module.exports = {
  fetchEmployees,
  fetchBenchReport,
  fetchFridaysChampions,
  fetchPerformanceEventCatalog,
  insertEmployee,
  insertBenchEvent,
  insertEmployeePerformanceEvent,
};
