const mongoose = require('mongoose');
const { ObjectId }  =mongoose.Schema;
/* Model/Schema */
const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  itemId: {
    type: ObjectId,
    ref: 'Item'
  }
})
/* End Model/Schema */

/* Export Model */
module.exports = mongoose.model('Feature',featureSchema)