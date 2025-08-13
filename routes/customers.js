const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');

router.post('/onboard', customersController.createOnboardingRequest);
router.get('/:id', customersController.getCustomerById);
router.get('/', customersController.getCustomers);
router.post('/apply', customersController.apply);

module.exports = router;
