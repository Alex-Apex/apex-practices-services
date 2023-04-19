const express = require('express');
const router = express.Router();
const { fetchEmployees } = require('../services/employeeService');

/**
 * Retrieves all employees
*/
const getEmployees = async(req, res)=>{
    try{
        //Fetch the list of employees from db
        const employees = await fetchEmployees();
        res.status(200).json(employees);
    } catch(error){
        // TODO: Please implement better exception handling
        res.status(500).json({message:'Error while retrieving employees'});
    }
};


router.get('/', getEmployees);
router.post('/', (req, res) => { /*...*/ });
router.get('/:id', (req, res) => { /*...*/ });
router.put('/:id', (req, res) => { /*...*/ });
router.delete('/:id', (req, res) => { /*...*/ });

module.exports = router;
