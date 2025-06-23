const Enquiry = require('../models/enquiryModel');

exports.createEnquiry = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const file = req.file;

    if (!title || !category || !file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const enquiry = new Enquiry({
      userId: req.user.userId,
      title,
      description,
      category,
      fileUrl: file.path || file.url, // Cloudinary or local
    });

    await enquiry.save();
   return res.status(201).json({data:enquiry , message: 'Enquiry submitted' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to submit enquiry' });
  }
};
