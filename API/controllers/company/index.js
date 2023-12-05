const CompanyAdd = require("../../models/companySchema/CompanyAdd");
const he = require("he");
// *****  Copmany page start ***** //
// Company Add ** //
// Get
exports.api_company_get = async (req, res, next) => {
  try {
    const allCompany = await Company.find({}).exec();

    const decodedCompany = allCompany.map((eachCompany) => ({
      _id: eachCompany._id,
      job_title: String(he.decode(eachCompany.job_title)),
      start_date: eachCompany.start_date,
      end_date: eachCompany.end_date,
      company: String(he.decode(eachCompany.company)),
      job_location: String(he.decode(eachCompany.job_location)),
      qualification: String(he.decode(eachCompany.qualification)),
      employment_status: String(he.decode(eachCompany.employment_status)),
      offerd_salary: Number(eachCompany.offerd_salary),
      salary_negotiable: eachCompany.salary_negotiable,
      category: String(he.decode(eachCompany.category)),
      vacancy: Number(eachCompany.vacancy),
      industry: String(he.decode(eachCompany.industry)),
      experience: String(he.decode(eachCompany.experience)),
      gender: String(he.decode(eachCompany.gender)),
      job_details: String(he.decode(eachCompany.job_details)),
      skills_required: String(he.decode(eachCompany.skills_required)),
      active_status: eachCompany.active_status,
      createdAt: eachCompany.createdAt,
      updatedAt: eachCompany.updatedAt,
    }));

    res.send(decodedCompany);
  } catch (error) {
    console.log(error);
    next();
  }
};
// Post
exports.api_company_post = async (req, res, next) => {
  let { name, phone, email, address } = req.body;

  const company_add = new CompanyAdd({ name, phone, email, address });

  company_add.save();
  const allCompany = await CompanyAdd.find({}).exec();
  try {
    res.send(allCompany);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Single
exports.api_single_company_get = async (req, res, next) => {
  res.send("single company get");
};
exports.api_company_edit = async (req, res, next) => {
  res.send("Company edit API");
  next();
};

exports.api_company_active_inactive = async (req, res, next) => {
  res.send("Company Active/inactive API");
  next();
};

exports.api_company_delete = async (req, res, next) => {
  res.send("delete");
};
// *****  Copmany page end ***** //
