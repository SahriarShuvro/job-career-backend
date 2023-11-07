const { Schema, model } = require("mongoose");

const CompanyAddSchema = new Schema(
  {
    c_name: {
      type: String,
      required: true,
      max: 99,
    },
    c_phone: {
      type: String,
      required: true,
      max: 15,
    },
    c_email: {
      type: String,
      required: true,
      max: 80,
    },
    c_address: {
      type: String,
      required: true,
      max: 300,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyAdd = model("CompanyAdd", CompanyAddSchema);
module.exports = CompanyAdd;
