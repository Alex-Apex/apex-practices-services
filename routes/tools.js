const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  //getRemoteBenchReport,
  getLocalBenchReport
} = require('../services/toolsServices');

const getXLBenchReport = async(req, res) => {
  try{
    const pathToXLData = req.query.path;
    let xlReport = await getLocalBenchReport(pathToXLData);
    res.status(201).json(xlReport);
  } catch(exception) {
    console.error(exception);
    // TODO: Please implement better exception handling
    res.status(500).json({message: 'Failed while Reading the XL Spreadsheet'});
  }
};

router.get('/benchxl',(req, res) => getXLBenchReport(req, res));
/*
router.get('/', (req, res) => getEmployees(req, res));
router.post('/', (req, res) => postEmployee(req, res));
router.put('/bench', (req, res) => getBenchReport(req, res));
*/

module.exports = router;