// routes/jobInternshipRoutes.js
const express = require('express');
const router = express.Router();
const { createJobInternship, getJobsInternships, getJobInternshipById, updateJobInternship, deleteJobInternship, applyJob, upload } = require('../controller/JobController');

router.post('/create', createJobInternship);
router.get('/getAllJobs', getJobsInternships);
router.get('/getJobById/:id', getJobInternshipById);
router.put('/update/:id', updateJobInternship);
router.delete('/delete/:id', deleteJobInternship);

module.exports = router;
