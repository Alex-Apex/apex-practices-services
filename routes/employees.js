const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  fetchEmployees,
  fetchBenchReport,
  fetchFridaysChampions,
  fetchPerformanceEventCatalog,
  insertEmployee,
  insertBenchEvent,
  insertEmployeePerformanceEvent,
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getEmployeesPerformanceEventsCatalog = async(req, res) => {
  try {
    const perfEventsCatalog = await fetchPerformanceEventCatalog();
    res.status(200).json(perfEventsCatalog);
  } catch (exception) {
    console.error(exception); //TODO implement better handling 
    res.status(500).json({message:'Failed to retrieve the performance events catalog from the DB'});
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getChampionsRoster = async (req, res) => {
  try {
    const options = null; //req.getQueryParameters('start');//start and end
    const champions = await fetchFridaysChampions();
    res.status(200).json(champions);
  } catch (exception) {
    console.error(exception); //TODO implement better exception handling
    res.status(500).json({message: 'Failed to retrieve the champions roster'});
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

/**
 * Posts the information to the web service to insert into the DB
 * @param {*} req 
 * @param {*} res 
 */
const postEmployeePerformanceManagementEvent = async(req, res) => {
  try {
    const newEvent = await insertEmployeePerformanceEvent(req.body);
    res.status(201).json(newEvent);
  } catch(exception) {
    console.error('Something went wrong while trying to insert a employee performance event', exception);
    res.status(500).json({message:'Failed to insert employee performance event'});
  }
};


router.get('/', (req, res) => getEmployees(req, res));
router.post('/', (req, res) => postEmployee(req, res));
router.get('/bench', (req, res) => getBenchReport(req, res));
//router.post('/bench', (req, res) => loadBenchReport(req, res));
router.post('/bench/events', (req, res) => postEmployeeBenchEvent(req, res));
router.get('/fridaychampions', (req, res) => getChampionsRoster(req, res));
router.get('/performance/events', (req, res) => getEmployeesPerformanceEventsCatalog(req, res));
router.post('/performance/events', (req, res) => postEmployeePerformanceManagementEvent(req, res));
router.get('/:id', (req, res) => {/* ...*/});
router.put('/:id', (req, res) => {/* ...*/});
router.delete('/:id', (req, res) => {/* ...*/});

module.exports = router;
