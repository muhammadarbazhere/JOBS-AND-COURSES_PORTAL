// applyJobRoutes.js
const express = require('express');
const router = express.Router();
const { applyJob } = require('../controller/applyJobController');

router.post('/apply/:id', applyJob); // Ensure this matches with your frontend URL

module.exports = router;
