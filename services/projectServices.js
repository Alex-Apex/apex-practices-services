const sql = require('mssql');
const {appConnectionPoolPromise} = require('../db');
const queries = require('../resources/queries');

/**
 * Fetches all projects from the database.
 * @return {Promise<Array<object>>} - An array of project objects.
 */
async function getProjects() {
  try {
    const pool = await appConnectionPoolPromise.connect();
    const request = pool.request();
    const result = await request.query(queries.GET_ALL_PROJECTS);
    return result.recordset;
  } catch (error) {
    console.error('Error fetching Projects:', error);
    throw error;
  }
}

/**
 * Inserts a new project into the database.
 * @param {object} project - The project object containing
 * details to be inserted.
 * @return {Promise<object>} - The inserted project object.
 */
async function createProject(project) {
  try {
    const pool = await appConnectionPoolPromise.connect();
    const request = pool.request();
    request
      .input('ProjectName', sql.NVarChar(sql.MAX), project.projectName)
      .input('ProjectDescription', sql.NVarChar(sql.MAX), project.projectDescription);
    
    console.log(`Name is: ${project.projectName}, description is: ${project.projectDescription}`);
    const result = await request.execute('InsertProject');
    return result.recordset[0];
  } catch (error) {
    console.error('Error inserting Project:', error);
    throw error;
  }
}

module.exports = {
  getProjects,
  createProject,
};
