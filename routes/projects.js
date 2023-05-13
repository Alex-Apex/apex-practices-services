const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  getProjects,
  createProject,
} = require('../services/projectServices');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllProjects = async (req, res) => {
  try {
    // Fetch the projects from DB
    const projects = await getProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    // TODO: Please implement better exception handling
    res.status(500).json({message: 'Error while retrieving all projects'});
  }
}

const postProject = async (req, res) => {
  try {
    const newProject = await createProject(req.body);
    res.status(201).json(newProject);
  } catch (insertProjectException) {
    console.error(insertProjectException);
    // TODO: Please implement better exception handling
    res.status(500).json({message: 'Failed to insert new Project'});
  }
};

router.get('/', (req, res) => getAllProjects(req, res));
router.post('/', (req, res) => postProject(req, res));
module.exports = router;
