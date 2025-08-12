const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accounts');

router.post('/', accountsController.createAccount);
router.get('/:id', accountsController.getAccountById);
router.get('/', (req, res) => {
  res.json({ message: 'List of accounts' });
});

module.exports = router;
