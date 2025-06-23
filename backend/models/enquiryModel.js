const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  category: { type: String, enum: ['Feedback', 'Issue', 'Feature Request'] },
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
