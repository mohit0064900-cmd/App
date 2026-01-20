const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true,
    enum: ['linkedin', 'github', 'instagram', 'youtube', 'twitter', 'facebook', 'portfolio'],
    lowercase: true
  },
  url: {
    type: String,
    required: [true, 'Please provide a URL'],
    trim: true,
    match: [
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      'Please provide a valid URL'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  icon: {
    type: String
  }
}, {
  timestamps: true
});

socialLinkSchema.index({ platform: 1 });
socialLinkSchema.index({ order: 1 });
socialLinkSchema.index({ isActive: 1 });

socialLinkSchema.statics.getActiveLinks = async function() {
  return this.find({ isActive: true }).sort({ order: 1 }).lean();
};

module.exports = mongoose.model('SocialLink', socialLinkSchema);
