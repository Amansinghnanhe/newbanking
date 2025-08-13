const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loans');

router.post('/apply', loansController.applyLoan);
router.get('/:id', loansController.getLoanById);

module.exports = router;
