const express = require('express');
const router = express.Router();
const { createCourse, getCourses,getCourseById, updateCourse, deleteCourse, upload } = require('../controller/CourseController');

router.post('/createCourse', upload.single('image'), createCourse);
router.get('/getCourses', getCourses);
router.get('/getCourseById/:id', getCourseById);
router.put('/updateCourse/:id', upload.single('image'), updateCourse);
router.delete('/deleteCourse/:id', deleteCourse);

module.exports = router;
