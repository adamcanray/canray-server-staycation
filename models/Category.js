const mongoose = require('mongoose');
const { ObjectId }  =mongoose.Schema;
/* Model/Schema */
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // array object because one category can have many itemId.
  itemId: [{
    type: ObjectId,
    ref: 'Item'
  }]
})
/* End Model/Schema */

/* Export Model */
module.exports = mongoose.model('Category',categorySchema)