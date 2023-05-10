const sql = require('mssql');
const appConnectionPoolPromise = require('./appConnectionPoolPromise');
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
      .input('ProjectName', sql.NVarChar, project.projectName)
      .input('ProjectDescription', sql.Text, project.projectDescription);

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
