// const nodemailer = require("nodemailer");
// const multer = require("multer");
// const path = require("path");
// require("dotenv").config();

// const Job = require('../model/JobSchema');

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage }).single('resume'); // Single file upload named 'resume'

// // Configure Nodemailer
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_JOB_SERVICE,
//     pass: process.env.EMAIL_PASS_JOB_SERVICE, // Use the app-specific password here
//   },
// });

// // Apply for a job
// const applyJob = async (req, res) => {
//   // Multer middleware handles file upload and attaches resume to req.file
//   upload(req, res, async (err) => {
//     if (err) {
//       console.error("Error uploading file:", err);
//       return res.status(500).json({ message: "File upload failed" });
//     }

//     const { firstName, email } = req.body;
//     const resume = req.file; // req.file contains file information

//     try {
//       // Fetch job details (assuming jobId is passed in req.params.id)
//       const job = await Job.findById(req.params.id);
//       if (!job) {
//         return res.status(404).json({ message: "Job not found" });
//       }

//       // Send email notification about job application
//       const mailOptions = {
//         from: process.env.EMAIL_JOB_SERVICE,
//         to: process.env.EMAIL_ADMIN, // Send to admin's email for notification
//         subject: `New Application Received for ${job.title}`,
//         text: `Subject: ${job.title}\nName: ${firstName}\nEmail: ${email}`,
//         attachments: [
//           {
//             filename: resume.originalname,
//             path: resume.path, // Ensure you have saved the resume correctly and provide the path here
//           },
//         ],
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log("Error sending email:", error);
//           return res.status(500).json({
//             message:
//               "Error sending email. Application submitted but email sending failed.",
//           });
//         }
//         console.log("Email sent:", info.response);
//         res.status(201).json({ message: "Application submitted successfully" });
//       });
//     } catch (error) {
//       console.error("Error submitting application:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   });
// };

// module.exports = {
//   applyJob,
// };





















const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const Job = require("../model/JobSchema");

// ✅ Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Folder for resumes
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage }).single("resume"); // Accept single file named 'resume'

// ✅ Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_JOB_SERVICE,
    pass: process.env.EMAIL_PASS_JOB_SERVICE, // App password from Gmail
  },
});

// ✅ Apply Job Controller
const applyJob = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("❌ Multer error:", err);
      return res.status(500).json({ message: "Resume upload failed" });
    }

    const { firstName, email } = req.body;
    const resume = req.file;

    if (!resume) {
      return res.status(400).json({ message: "Resume file is missing" });
    }

    try {
      // ✅ Find Job by ID
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      // ✅ Prepare Email
      const mailOptions = {
        from: process.env.EMAIL_JOB_SERVICE,
        to: process.env.EMAIL_ADMIN, // Send to admin email
        subject: `New Application for ${job.title}`,
        text: `A new application was submitted.\n\nName: ${firstName}\nEmail: ${email}\nJob: ${job.title}`,
        attachments: [
          {
            filename: resume.originalname,
            path: resume.path,
          },
        ],
      };

      // ✅ Send Email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("❌ Email send error:", error);
          return res.status(500).json({
            message:
              "Application submitted, but failed to send email notification.",
          });
        }
        console.log("📧 Email sent:", info.response);
        res
          .status(201)
          .json({ message: "Application submitted successfully!" });
      });
    } catch (error) {
      console.error("❌ Error in applyJob:", error);
      res.status(500).json({ message: "Server error during application" });
    }
  });
};

module.exports = {
  applyJob,
};
