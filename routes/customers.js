const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');

router.post('/onboard', customersController.createOnboardingRequest);
router.get('/:id', customersController.getCustomerById);
router.post('/', (req, res) => {
  const customerData = req.body;
  res.status(201).json({ message: 'Customer created successfully', data: customerData });
});



module.exports = router;
