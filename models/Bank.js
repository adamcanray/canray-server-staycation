const mongoose = require('mongoose');
/* Model/Schema */
const bankSchema = new mongoose.Schema({
  nameBank: {
    type: String,
    required: true,
  },
  nomorRekening: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
})
/* End Model/Schema */

/* Export Model */
module.exports = mongoose.model('Bank',bankSchema)