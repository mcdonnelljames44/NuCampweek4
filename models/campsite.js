const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const Schema = mongoose.Schema;   // just to make a shorthand for mongoose.Schema
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const campsiteSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  elevation: {
    type: Number,
    required: true
  },
  cost: {
    type: Currency,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  comments: [commentSchema]
}, {
  timestamps: true  // mongoose will auto-generate createdAt and updatedAt properties
});

const Campsite = mongoose.model('Campsite', campsiteSchema) // 1st argument should be a capitalized and singular (not plural) version of our object

module.exports = Campsite; 