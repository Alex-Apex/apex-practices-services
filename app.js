const express = require('express');
const employeeRouter = require('./routes/employees');
const app = express();
app.use('/employees',employeeRouter);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
