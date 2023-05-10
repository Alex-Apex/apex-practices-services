const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
app.use(
    cors({
      origin: 'http://localhost:3000',
    }),
);

const employeesRouter = require('./routes/employees');
app.use('/employees', employeesRouter);

const myToolsRouter = require('./routes/tools');
app.use('/tools', myToolsRouter);

const skillsRouter = require('./routes/skills');
app.use('/skills', skillsRouter);

const projectsRouter = require('./routes/projects');
app.use('/projects',projectsRouter);


const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Export the app object for testing purposes
module.exports = {app, server};
