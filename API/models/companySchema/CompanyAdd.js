const { Schema, model } = require("mongoose");

const CompanyAddSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 99,
    },
    phone: {
      type: String,
      required: true,
      max: 15,
    },
    email: {
      type: String,
      required: true,
      max: 80,
    },
    address: {
      type: String,
      required: true,
      max: 300,
    },
    active_status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyAdd = model("CompanyAdd", CompanyAddSchema);
module.exports = CompanyAdd;
