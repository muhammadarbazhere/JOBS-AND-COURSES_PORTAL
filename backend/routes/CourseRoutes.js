const express = require('express');
const router = express.Router();
const { 
  createCourse, 
  getCourses, 
  getCourseById, 
  updateCourse, 
  deleteCourse, 
  upload 
} = require('../controller/CourseController');

const { verifyToken } = require('../controller/UserController'); // ✅ Import the auth middleware

// Create Course - ✅ Protected
router.post('/createCourse', verifyToken, upload.single('image'), createCourse);

// Get All Courses - 🌐 Public
router.get('/getCourses', getCourses);

// Get Single Course by ID - 🌐 Public
router.get('/getCourseById/:id', getCourseById);

// Update Course - ✅ Protected
router.put('/updateCourse/:id', verifyToken, upload.single('image'), updateCourse);

// Delete Course - ✅ Protected
router.delete('/deleteCourse/:id', verifyToken, deleteCourse);

module.exports = router;
