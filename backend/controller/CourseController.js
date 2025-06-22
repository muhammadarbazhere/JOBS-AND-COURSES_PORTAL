// controllers/courseController.js
const Course = require("../model/CourseSchema");
const multer = require("multer");
const path = require("path");

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const createCourse = async (req, res) => {
  try {
    const { title, author, description, category, duration, charges } =
      req.body;

    const course = new Course({
      title,
      author,
      description,
      category,
      duration,
      charges,
      image: req.file.path, // Assuming req.file contains the image file details
    });

    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create course", error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, category, duration, charges } = req.body;
  let image = req.file ? req.file.path : null;

  try {
    const updatedData = {
      title,
      author,
      description,
      category,
      duration,
      charges,
    };
    if (image) updatedData.image = image;

    const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  upload,
};
