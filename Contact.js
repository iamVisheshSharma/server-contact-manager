const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    gstin: { type: String, required: true },
    email: { type: String, default: null },
    contact_number: { type: String, required: true },
    alt_contact_number: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
