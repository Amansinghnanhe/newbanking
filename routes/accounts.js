const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accounts');

router.post('/', accountsController.createAccount);
router.get('/:id', accountsController.getAccountById);

module.exports = router;
