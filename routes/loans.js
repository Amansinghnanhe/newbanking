const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loans');

router.post('/apply', loansController.applyLoan);
router.get('/:id', loansController.getLoanById);
router.get('/', (req, res) => {
    res.json({ message: 'List of loans' });
});

module.exports = router;
