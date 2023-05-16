const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  fetchEmployees,
  fetchBenchReport,
  insertEmployee,
  insertBenchEvent,
} = require('../services/employeeService');

/**
 * Retrieves all employees
 * @function getEmployees
 * @param {Object} req - The request object
 * @param {Object} res - The results object
 */
const getEmployees = async (req, res) => {
  try {
    // Fetch the list of employees from db
    const employees = await fetchEmployees(true);
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    // TODO: Please implement better exception handling
    res.status(500).json({message: 'Error while retrieving employees'});
  }
};
/**
 * Fetches the benched resources from db
 * @param {object} req -request object
 * @param {object} res - result object
 */
const getBenchReport = async (req, res) => {
  try {
    const benchedEmployees = await fetchBenchReport();
    res.status(200).json(benchedEmployees);
  } catch (exception) {
    console.error(exception);
    // TODO: Please implement better exception handling
    res.status(500).json({message: 'Failed while retrieving bench report'});
  }
};

const postEmployee = async (req, res) => {
  try {
    const newEmployee = await insertEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (insertEmployeeException) {
    console.error(insertEmployeeException);
    res.status(500).json({message: 'Failed to insert employee'});
  }
};

/**
 * Inserts a new bench event into the db.
 * @param {*} req 
 * @param {*} res 
 */
const postEmployeeBenchEvent = async (req, res) => {
  try {
    const newEvent = await insertBenchEvent(req.body);
    res.status(201).json(newEvent);
  } catch(exception) {
    console.error('Something went wrong while trying to insert a new bench event', exception);
    res.status(500).json({message:'Failed to insert bench event'});
  }
};


router.get('/', (req, res) => getEmployees(req, res));
router.post('/', (req, res) => postEmployee(req, res));
router.get('/bench', (req, res) => getBenchReport(req, res));
//router.post('/bench', (req, res) => loadBenchReport(req, res));
router.post('/bench/events', (req, res) => postEmployeeBenchEvent(req, res));

router.get('/:id', (req, res) => {/* ...*/});
router.put('/:id', (req, res) => {/* ...*/});
router.delete('/:id', (req, res) => {/* ...*/});

module.exports = router;
