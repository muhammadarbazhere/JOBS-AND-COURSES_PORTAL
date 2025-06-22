const express = require('express');
const router = express.Router();
const { CreditCardPayment } = require('../controller/creditController');

router.post('/credit-card', CreditCardPayment);

module.exports = router;
