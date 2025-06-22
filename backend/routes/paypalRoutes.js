const express = require('express');
const router = express.Router();
const { createPayPalOrder } = require('../controller/payPalController');

router.post('/paypal', createPayPalOrder);

module.exports = router;
