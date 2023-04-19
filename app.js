const express = require('express');
const employeesRouter = require('./routes/employees');
const app = express();
app.use('/employees',employeesRouter);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
