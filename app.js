const express = require('express');
const app = express();
app.post('/employees', (req, res) => { /*...*/ });
app.get('/employees', (req, res) => { /*...*/ });
app.get('/employees/:id', (req, res) => { /*...*/ });
app.put('/employees/:id', (req, res) => { /*...*/ });
app.delete('/employees/:id', (req, res) => { /*...*/ });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
