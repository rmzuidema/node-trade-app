const mongoose = require('mongoose');
// const validator = require('validator');
// const _ = require('lodash');
// const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

var ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  category: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  shipment: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  payment: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  sold: {
    type: Boolean,
    default: false
  },
  exchangeWish: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  minimumPrice: {
    type: Number,
    required: false
  },
  owner: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});


ItemSchema.statics.findByCategory = function(category) {
  var Item = this;
  return Item.find({category: category});
}

var Item = mongoose.model('Item', ItemSchema);

module.exports = { Item }
