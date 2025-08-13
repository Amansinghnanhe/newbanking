const pool = require('../config/db');

exports.getLoanById = async (req, res) => {
  try {
    const loanId = req.params.id;
    const [rows] = await pool.query('SELECT * FROM loans WHERE id = ?', [loanId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching loan by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Apply for Loan
exports.applyLoan = async (req, res) => {
  const { userId, amount, duration, purpose } = req.body;

  if (!userId || !amount || !duration || !purpose) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = `
      INSERT INTO loans (user_id, amount, duration, purpose, status, applied_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const values = [userId, amount, duration, purpose, 'pending'];

    await pool.query(query, values);

    res.status(201).json({ message: 'Loan application submitted successfully' });
  } catch (error) {
    console.error('Error applying for loan:', error);
    res.status(500).json({ message: 'Server error. Could not apply for loan' });
  }
};
