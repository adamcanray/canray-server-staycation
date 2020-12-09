const mongoose = require('mongoose');
/* Model/Schema */
const memberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
})
/* End Model/Schema */

/* Export Model */
module.exports = mongoose.model('Member',memberSchema)