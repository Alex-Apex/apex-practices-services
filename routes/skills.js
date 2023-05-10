const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  fetchAllSkills,
  fetchSkillById,
  fetchAllSkillTrees,
  fetchSkillTree,
  createSkill,
} = require('../services/skillsService');

/**
 * Gets all the skills available
 * @param {} req 
 * @param {*} res 
 */
const getSkills = async (req, res) => {
  try {
    // Fetch the list of employees from db
    const skills = await fetchAllSkills();
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    // TODO: Please implement better exception handling
    res.status(500).json({message: 'Error while retrieving Skills'});
  }
};

const postSkill = async (req, res) => {
  try {
    const newSkill = await createSkill(req.body);
    res.status(201).json(newSkill);
  } catch (insertSkillException) {
    console.error(insertSkillException);
    res.status(500).json({message: 'Failed to insert Skill'});
  }
};

router.get('/', (req, res) => getSkills(req, res));
router.get('/trees', (req, res) => getSkillTrees(req, res));
router.get('/trees/:id', (req, res) => getSkillTree(req, res));
router.post('/', (req, res) => postSkill(req, res));
router.get('/:id', (req, res) => {/* ...*/});
router.put('/:id', (req, res) => {/* ...*/});
router.delete('/:id', (req, res) => {/* ...*/});

module.exports(router);
