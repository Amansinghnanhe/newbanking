
const pool = require('../config/db');

exports.applyLoan = async (req, res) => {
  res.send("Loan applied"); 
};

exports.getLoanById = async (req, res) => {
  res.send("Loan details"); 
};
