const JobPost = require("../../models/jobSchema/JobAdd");

// *****  Job Post page start ***** //
// Job Add ** //
// Get
exports.api_job_post_get = async (req, res, next) => {
  const allJobPost = await JobPost.find({}).exec();
  try {
    res.send(allJobPost);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Post
exports.api_job_post_post = async (req, res, next) => {
  try {
    const {
      job_title,
      start_date,
      end_date,
      company,
      job_location,
      qualification,
      employment_status,
      offerd_salary,
      salary_negotiable,
      category,
      vacancy,
      industry,
      experience,
      gender,
      job_details,
      skills_required,
    } = req.body;

    // Create a new job post instance
    const newJob = new JobPost({
      job_title,
      start_date,
      end_date,
      company,
      job_location,
      qualification,
      employment_status,
      offerd_salary,
      salary_negotiable,
      category,
      vacancy,
      industry,
      experience,
      gender,
      job_details,
      skills_required,
    });

    // Save the new job post to the database
    const savedJob = await newJob.save();

    // Send a success response
    res.status(201).json({
      success: true,
      jobPost: savedJob,
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ** Single
exports.api_single_job_post = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleJobPost = await JobPost.findById(id);

    if (!singleJobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.json(singleJobPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update by PATCH
exports.api_update_job_post = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const updateJob = await JobPost.findOneAndUpdate({ _id: jobId }, req.body, {
      new: true,
    });

    res.json({ updateJob });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: `Something went wrong` });
  }
};

exports.api_single_job_activate_inactivate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active_status } = req.body;

    // Update the Job's active_status
    const updatedJob = await JobPost.findOneAndUpdate(
      { _id: id },
      { active_status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ success: true, updatedJob });
  } catch (error) {
    console.error("Error in api_single_Job_activate_inactivate:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete
exports.api_delete_job_post = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJobPost = await JobPost.findByIdAndRemove(
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

// *****  Job Post page end ***** //
