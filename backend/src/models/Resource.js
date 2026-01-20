const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['programming', 'web-development', 'data-structures', 'algorithms', 'databases', 'machine-learning', 'other'],
    lowercase: true
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  fileKey: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

resourceSchema.index({ title: 'text', description: 'text' });
resourceSchema.index({ category: 1 });
resourceSchema.index({ createdAt: -1 });

resourceSchema.methods.incrementDownloads = function() {
  this.downloads += 1;
  return this.save();
};

resourceSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('Resource', resourceSchema);
