const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const customerRoutes = require('./routes/customers');
const accountRoutes = require('./routes/accounts');
const loanRoutes = require('./routes/loans');

const app = express();

app.use(bodyParser.json());

app.use('/api/customers', customerRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/loans', loanRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Banking System API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
