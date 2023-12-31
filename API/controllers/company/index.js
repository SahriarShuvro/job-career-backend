const CompanyAdd = require("../../models/companySchema/CompanyAdd");
const he = require("he");
const fs = require("fs").promises;
const getAllCompanies = require("../../lib/getAllPost");

// *****  Copmany page start ***** //
// Company Add ** //
// Get
exports.api_company_get = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const decodedCompany = (companiesPost) => ({
      _id: companiesPost._id,
      avatar: companiesPost.avatar,
      title: String(he.decode(companiesPost.title)),
      phone: String(he.decode(companiesPost.phone)),
      email: String(he.decode(companiesPost.email)),
      address: String(he.decode(companiesPost.address)),
      active_status: companiesPost.active_status,
      createdAt: companiesPost.createdAt,
      updatedAt: companiesPost.updatedAt,
    });

    const allCompanies = await getAllCompanies(
      CompanyAdd,
      page,
      limit,
      decodedCompany
    );

    res.json(allCompanies);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Post
exports.api_create_company = async (req, res, next) => {
  try {
    const { title, phone, email, address, active_status } = req.body;
    const avatar = req.file ? req.file.path.split("public").join("") : null;

    // Create a new company post instance
    const newCompany = new CompanyAdd({
      avatar,
      title,
      phone,
      email,
      address,
      active_status,
    });

    // Save the new Company post to the database
    const savedCompany = await newCompany.save();

    res.status(201).json({
      success: true,
      companyPost: savedCompany,
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Single
exports.api_single_company_get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleCompany = await CompanyAdd.findById(id);

    if (!singleCompany) {
      return res.status(404).json({ message: "Company post not found" });
    }
    const decodedCompany = {
      _id: singleCompany._id,
      avatar: String(he.decode(singleCompany.avatar)),
      title: String(he.decode(singleCompany.title)),
      phone: String(he.decode(singleCompany.phone)),
      email: String(he.decode(singleCompany.email)),
      address: String(he.decode(singleCompany.address)),
      active_status: singleCompany.active_status,
      createdAt: singleCompany.createdAt,
      updatedAt: singleCompany.updatedAt,
    };
    res.json(decodedCompany);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update by PATCH
exports.api_update_company = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, phone, email, address, active_status } = req.body;
    const newAvatar = req.file ? req.file.path.split("public").join("") : null;

    const companyToUpdate = await CompanyAdd.findById(id);
    if (!companyToUpdate) {
      return res.status(400).json({ error: "Company is not found!" });
    }

    if (newAvatar && companyToUpdate.avatar) {
      // Delete the old avatar
      await fs.unlink(`public/${companyToUpdate.avatar}`);
    } else if (newAvatar === null) {
      // Update without changing the avatar
      const updateCompany = await CompanyAdd.findOneAndUpdate(
        { _id: id },
        { title, phone, email, address, active_status },
        { new: true }
      );

      if (!updateCompany) {
        return res.status(404).json({ error: "Company is not found" });
      }

      return res.json({ success: true, updateCompany });
    }

    // Update with the new avatar
    const updateCompany = await CompanyAdd.findOneAndUpdate(
      { _id: id },
      { avatar: newAvatar, title, phone, email, address, active_status },
      { new: true }
    );

    if (!updateCompany) {
      return res.status(404).json({ error: "Company is not found" });
    }

    res.json({ success: true, updateCompany });
  } catch (error) {
    console.error("Error in api_update_company:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//  Active/Inactive
exports.api_company_active_inactive = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active_status } = req.body;

    // Update the Job's active_status
    const updateCompany = await CompanyAdd.findOneAndUpdate(
      { _id: id },
      { active_status },
      { new: true }
    );

    if (!updateCompany) {
      return res.status(404).json({ error: "Compnay not found" });
    }

    res.json({ success: true, updateCompany });
  } catch (error) {
    console.error("Error in api_company_active_inactive:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.api_delete_company = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCompany = await CompanyAdd.findByIdAndRemove(
      { _id: id },
      req.body
    );

    if (!deletedCompany) {
      return res.status(404).json({ message: "Company post not found" });
    }

    res.json(deletedCompany);
  } catch (error) {
    next(error);
  }
};
// *****  Copmany page end ***** //
