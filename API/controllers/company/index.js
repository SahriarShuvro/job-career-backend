const CompanyAdd = require("../../models/companySchema/CompanyAdd");
// *****  Copmany page start ***** //
// Company Add ** //
// Get
exports.api_company_get = async (req, res, next) => {
  const allCompany = await CompanyAdd.find({}).exec();
  try {
    res.send(allCompany);
  } catch (error) {
    console.log(error);
    next();
  }
};
// Post
exports.api_company_post = async (req, res, next) => {
  let { c_name, c_phone, c_email, c_address } = req.body;

  const company_add = new CompanyAdd({ c_name, c_phone, c_email, c_address });

  company_add.save();
  const allCompany = await CompanyAdd.find({}).exec();
  try {
    res.send(allCompany);
  } catch (error) {
    console.log(error);
    next();
  }
};
// Patch
exports.api_company_patch = async (req, res, next) => {
  res.send("Company Patch API");
  next();
};

// Single
exports.api_single_company_get = async (req, res, next) => {
  res.send("single company");
};
exports.api_single_company_post = async (req, res, next) => {
  res.send("single company");
};
exports.api_single_company_patch = async (req, res, next) => {
  res.send("single company");
};
// *****  Copmany page end ***** //
