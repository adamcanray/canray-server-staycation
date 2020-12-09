const mongoose = require('mongoose');
/* Model/Schema */
const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
})
/* End Model/Schema */

/* Export Model */
module.exports = mongoose.model('Image',imageSchema)