const JobQualificationAdd = require("../../models/jobSchema/JobQualificationAdd");
const he = require("he");
// Qualification ***
exports.api_qualification_get = async (req, res, next) => {
  try {
    const allJobQualification = await JobQualificationAdd.find({}).exec();
    const decodedQualification = allJobQualification.map((qualification) => ({
      _id: qualification._id,
      title: he.decode(qualification.title),
      color_code: he.decode(qualification.color_code),
      active_status: qualification.active_status,
      createdAt: qualification.createdAt,
      updatedAt: qualification.updatedAt,
    }));
    res.send(decodedQualification);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.api_qualification_post = async (req, res, next) => {
  try {
    let { title, color_code } = req.body;

    const existingQualificationTitle = await JobQualificationAdd.findOne({
      title,
    }).exec();

    if (existingQualificationTitle) {
      return res.status(400).json({
        errors: [
          {
            msg: "Qualification title already exists!",
          },
        ],
      });
    }

    const qualification_add = new JobQualificationAdd({
      title,
      color_code,
    });

    await qualification_add.save();

    const allJobQualification = await JobQualificationAdd.find({}).exec();

    res.send(allJobQualification);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Single
exports.api_single_qualification_get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleQualification = await JobQualificationAdd.findById(id);

    if (!singleQualification) {
      res.status(404).json({ message: "Qualification Not Found" });
    }

    const decodedQualification = {
      _id: singleQualification._id,
      title: he.decode(singleQualification.title),
      color_code: he.decode(singleQualification.color_code),
      active_status: singleQualification.active_status,
      createdAt: singleQualification.createdAt,
      updatedAt: singleQualification.updatedAt,
    };

    res.json(decodedQualification);
  } catch (error) {
    console.log(error);
  }
};
exports.api_single_qualification_post = async (req, res, next) => {
  res.send("hi");
};
exports.api_single_qualification_edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, color_code } = req.body;

    const existingQualificationTitle = await JobQualificationAdd.findOne({
      title,
    }).exec();

    if (existingQualificationTitle) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Qualification title already exists!" }] });
    }

    // Update the Qualification
    const updatedQualification = await JobQualificationAdd.findOneAndUpdate(
      { _id: id },
      { title, color_code },
      { new: true }
    );

    if (!updatedQualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }

    res.json({ success: true, updatedQualification });
  } catch (error) {
    console.error("Error in api_single_qualification_edit:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.api_single_qualification_activate_inactivate = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const { active_status } = req.body;

    // Update the Qualification's active_status
    const updatedQualification = await JobQualificationAdd.findOneAndUpdate(
      { _id: id },
      { active_status },
      { new: true }
    );

    if (!updatedQualification) {
      return res.status(404).json({ error: "Qualification not found" });
    }

    res.json({ success: true, updatedQualification });
  } catch (error) {
    console.error(
      "Error in api_single_qualification_activate_inactivate:",
      error
    );
    res.status(500).json({ error: "Something went wrong" });
  }
};
exports.api_single_qualification_delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJobPost = await JobQualificationAdd.findByIdAndRemove(
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
