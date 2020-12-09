const mongoose = require('mongoose');
const { ObjectId }  =mongoose.Schema;
/* Model/Schema */
const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
  },
  itemId: {
    type: ObjectId,
    ref: 'Item'
  }
})
/* End Model/Schema */

/* Export Model */
module.exports = mongoose.model('Activity',activitySchema)