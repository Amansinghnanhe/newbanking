const pool = require('../config/db');

exports.createAccount = async (req, res) => {
  const {
    customerId, accountNumber, openingDate,
    initialDepositAmount, currentBalance,
    accountTypeId, branchId, relationshipManagerId
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO accounts 
      (customer_id, account_number, opening_date, initial_deposit_amount, current_balance, account_type_id, branch_id, relationship_manager_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customerId, accountNumber, openingDate,
        initialDepositAmount, currentBalance,
        accountTypeId, branchId,
        relationshipManagerId || null
      ]
    );

    res.status(201).json({ message: 'Account created', accountId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAccountById = async (req, res) => {
  const accountId = req.params.id;
  try {
    const [accounts] = await pool.query(`SELECT * FROM accounts WHERE id = ?`, [accountId]);
    if (accounts.length === 0) return res.status(404).json({ message: 'Account not found' });
    res.json(accounts[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
