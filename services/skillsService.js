const sql = require('mssql');
const queries = require('../resources/queries');
const {appConnectionPoolPromise} = require('../db');
let pool;
/**
 * Gets the employees from the db
 */
async function fetchAllSkills() {
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
 * Inserts a new skill into the database.
 * @param {object} skill - The skill object containing
 * details to be inserted.
 * @return {Promise<object>} - The inserted skill object.
 */
async function createSkill(skill) {
  try {
    const pool = await appConnectionPoolPromise.connect();
    const request = pool.request();
    request
        .input('SkillName', sql.NVarChar, skill.skillName)
        .input('SkillDescription', sql.Text, skill.skillDescriptionTitle)
        .input('Tags', sql.Text, skill.tags)
        .input('ParentSkillId', sql.Int, skill.parenSkillId);

    const result = await request.execute('InsertSkill');
    return result.recordset[0];
  } catch (error) {
    console.error('Error inserting Skill:', error);
    throw error;
  }
}
/**
 * 
 */
const fetchSkillById = () => {
  console.error('Function Fetch Skill by ID is not yet implemented');
}

const fetchAllSkillTrees = () => {
  console.error('Function Fetch All Skill Trees is not yet implemented');
}

const fetchSkillTree = () => {
  console.error('Function Fetch Skill Tree is not yet implemented');
}

module.exports = {
  fetchAllSkills,
  fetchSkillById,
  fetchAllSkillTrees,
  fetchSkillTree,
  createSkill,
};