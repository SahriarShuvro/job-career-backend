const JobIndustryAdd = require("../../models/jobSchema/JobIndustryAdd");
const he = require("he");
// Industry ***
exports.api_industry_get = async (req, res, next) => {
  try {
    const allJobIndustry = await JobIndustryAdd.find({}).exec();

    const decodedIndustry = allJobIndustry.map((industry) => ({
      _id: industry._id,
      title: he.decode(industry.title),
      color_code: he.decode(industry.color_code),
      active_status: industry.active_status,
      createdAt: industry.createdAt,
      updatedAt: industry.updatedAt,
    }));

    res.send(decodedIndustry);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.api_industry_post = async (req, res, next) => {
  try {
    let { title, color_code } = req.body;

    const existingIndustryTitle = await JobIndustryAdd.findOne({
      title,
    }).exec();

    if (existingIndustryTitle) {
      return res.status(400).json({
        errors: [
          {
            msg: "Industry title already exists!",
          },
        ],
      });
    }

    const industry_add = new JobIndustryAdd({
      title,
      color_code,
    });

    await industry_add.save();

    const allJobIndustry = await JobIndustryAdd.find({}).exec();

    res.send(allJobIndustry);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Single
exports.api_single_industry_get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleIndustry = await JobIndustryAdd.findById(id);

    if (!singleIndustry) {
      res.status(404).json({ message: "Industry Not Found" });
    }

    const decodedIndustry = {
      _id: singleIndustry._id,
      title: he.decode(singleIndustry.title),
      color_code: he.decode(singleIndustry.color_code),
      active_status: singleIndustry.active_status,
      createdAt: singleIndustry.createdAt,
      updatedAt: singleIndustry.updatedAt,
    };

    res.json(decodedIndustry);
  } catch (error) {
    console.log(error);
  }
};
exports.api_single_industry_post = async (req, res, next) => {
  res.send("hi");
};
exports.api_single_industry_edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, color_code } = req.body;

    const existingIndustryTitle = await JobIndustryAdd.findOne({
      title,
    }).exec();

    if (existingIndustryTitle) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Industry title already exists!" }] });
    }

    // Update the Industry
    const updatedIndustry = await JobIndustryAdd.findOneAndUpdate(
      { _id: id },
      { title, color_code },
      { new: true }
    );

    if (!updatedIndustry) {
      return res.status(404).json({ error: "Industry not found" });
    }

    res.json({ success: true, updatedIndustry });
  } catch (error) {
    console.error("Error in api_single_industry_edit:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.api_single_industry_activate_inactivate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active_status } = req.body;

    // Update the Industry's active_status
    const updatedIndustry = await JobIndustryAdd.findOneAndUpdate(
      { _id: id },
      { active_status },
      { new: true }
    );

    if (!updatedIndustry) {
      return res.status(404).json({ error: "Industry not found" });
    }

    res.json({ success: true, updatedIndustry });
  } catch (error) {
    console.error("Error in api_single_industry_activate_inactivate:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
exports.api_single_industry_delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJobPost = await JobIndustryAdd.findByIdAndRemove(
      { _id: id },
      req.body
    );

    if (!deletedJobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.json(deletedJobPost);
  } catch (error) {
    next(error);
  }
};
