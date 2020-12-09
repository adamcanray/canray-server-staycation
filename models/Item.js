/*
* Note: 
* - categoryId is object because each item only have each categoryId.
* - imageId is array object because each item can have many imageId.
*/

const mongoose = require('mongoose');
/* import ObjectId type */
const {ObjectId} = mongoose.Schema
/* End import ObjectId type */

/* Model/Schema */
const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    default: 'Indonesia',
  },
  city: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
  },
  description: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    default: 'night',
  },
  sumBooking: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: ObjectId,
    ref: 'Category'
  },
  imageId: [{
    type: ObjectId,
    /* ref to Model */
    ref: 'Image'
  }],
  featureId: [{
    type: ObjectId,
    /* ref to Model */
    ref: 'Feature'
  }],
  activityId: [{
    type: ObjectId,
    /* ref to Model */
    ref: 'Activity'
  }],
})
/* End Model/Schema */

/* Export Model */
module.exports = mongoose.model('Item',itemSchema)