// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');
// const { createEnquiry } = require('../controllers/enquiryController');

// router.post('/', auth, upload.single('file'), createEnquiry);

// module.exports = router;


const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const auth = require('../middlewares/authMiddleware');
const { createEnquiry } = require('../controllers/enquiryController'); 
router.post("/",auth,upload.single("file"),createEnquiry, async (req, res) => {
  try {
    console.log("Uploaded file:", req.file);

    // Access file path: req.file.path
    // Save enquiry details + req.file.filename to DB
    res.status(200).json({ message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "File upload failed." });
  }
});

module.exports = router;
