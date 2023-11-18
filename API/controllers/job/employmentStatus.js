const JobEmploymentStatusAdd = require("../../models/jobSchema/JobEmploymentStatusAdd");
const he = require("he");
// Employment Status ***
exports.api_employment_status_get = async (req, res, next) => {
  try {
    const allJobEmploymentStatus = await JobEmploymentStatusAdd.find({}).exec();

    const decodedEmoloymentStatus = allJobEmploymentStatus.map(
      (employmentStatus) => ({
        _id: employmentStatus._id,
        title: he.decode(employmentStatus.title),
        color_code: he.decode(employmentStatus.color_code),
        active_status: employmentStatus.active_status,
        createdAt: employmentStatus.createdAt,
        updatedAt: employmentStatus.updatedAt,
      })
    );

    res.send(decodedEmoloymentStatus);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.api_employment_status_post = async (req, res, next) => {
  try {
    let { title, color_code } = req.body;

    const existingEmploymentStatusTitle = await JobEmploymentStatusAdd.findOne({
      title,
    }).exec();

    if (existingEmploymentStatusTitle) {
      return res.status(400).json({
        errors: [
          {
            msg: "Employment Status title already exists!",
          },
        ],
      });
    }

    const employmentStatus_add = new JobEmploymentStatusAdd({
      title,
      color_code,
    });

    await employmentStatus_add.save();

    const allJobEmploymentStatus = await JobEmploymentStatusAdd.find({}).exec();

    res.send(allJobEmploymentStatus);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Single
exports.api_single_employment_status_get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleEmploymentStatus = await JobEmploymentStatusAdd.findById(id);

    if (!singleEmploymentStatus) {
      res.status(404).json({ message: "Employment Status Not Found" });
      return;
    }
    const decodedEmoloymentStatus = {
      _id: singleEmploymentStatus._id,
      title: he.decode(singleEmploymentStatus.title),
      color_code: he.decode(singleEmploymentStatus.color_code),
      active_status: singleEmploymentStatus.active_status,
      createdAt: singleEmploymentStatus.createdAt,
      updatedAt: singleEmploymentStatus.updatedAt,
    };

    res.send(decodedEmoloymentStatus);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
exports.api_single_employment_status_post = async (req, res, next) => {
  res.send("hi");
};
exports.api_single_employment_status_edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, color_code } = req.body;

    const existingEmploymentStatusTitle = await JobEmploymentStatusAdd.findOne({
      title,
    }).exec();

    if (existingEmploymentStatusTitle) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Employment Status title already exists!" }] });
    }

    // Update the EmploymentStatus
    const updatedEmploymentStatus =
      await JobEmploymentStatusAdd.findOneAndUpdate(
        { _id: id },
        { title, color_code },
        { new: true }
      );

    if (!updatedEmploymentStatus) {
      return res.status(404).json({ error: "EmploymentStatus not found" });
    }

    res.json({ success: true, updatedEmploymentStatus });
  } catch (error) {
    console.error("Error in api_single_employment_status_edit:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.api_single_employment_status_activate_inactivate = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const { active_status } = req.body;

    // Update the Employment Status's active_status
    const updatedEmploymentStatus =
      await JobEmploymentStatusAdd.findOneAndUpdate(
        { _id: id },
        { active_status },
        { new: true }
      );

    if (!updatedEmploymentStatus) {
      return res.status(404).json({ error: "Employment Status not found" });
    }

    res.json({ success: true, updatedEmploymentStatus });
  } catch (error) {
    console.error(
      "Error in api_single_employment_status_activate_inactivate:",
      error
    );
    res.status(500).json({ error: "Something went wrong" });
  }
};
exports.api_single_employment_status_delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJobPost = await JobEmploymentStatusAdd.findByIdAndRemove(
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
