const JobPost = require("../../models/jobSchema/JobAdd");

// *****  Job Post page start ***** //
// Job Add ** //
// Get
exports.api_job_post_get = async (req, res, next) => {
  try {
    const allJobPost = await JobPost.find({}).exec();

    const decodedJobPost = allJobPost.map((eachJobPost) => ({
      _id: eachJobPost._id,
      job_title: eachJobPost.job_title,
      start_date: eachJobPost.start_date,
      end_date: eachJobPost.end_date,
      company: eachJobPost.company,
      job_location: eachJobPost.job_location,
      qualification: eachJobPost.qualification,
      employment_status: eachJobPost.employment_status,
      offerd_salary: eachJobPost.offerd_salary,
      salary_negotiable: eachJobPost.salary_negotiable,
      category: eachJobPost.category,
      vacancy: eachJobPost.vacancy,
      industry: eachJobPost.industry,
      experience: eachJobPost.experience,
      gender: eachJobPost.gender,
      job_details: eachJobPost.job_details,
      skills_required: eachJobPost.skills_required,
      active_status: eachJobPost.active_status,
    }));

    res.send(decodedJobPost);
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
    const decodedJobPost = {
      _id: singleJobPost._id,
      job_title: singleJobPost.job_title,
      start_date: singleJobPost.start_date,
      end_date: singleJobPost.end_date,
      company: singleJobPost.company,
      job_location: singleJobPost.job_location,
      qualification: singleJobPost.qualification,
      employment_status: singleJobPost.employment_status,
      offerd_salary: singleJobPost.offerd_salary,
      salary_negotiable: singleJobPost.salary_negotiable,
      category: singleJobPost.category,
      vacancy: singleJobPost.vacancy,
      industry: singleJobPost.industry,
      experience: singleJobPost.experience,
      gender: singleJobPost.gender,
      job_details: singleJobPost.job_details,
      skills_required: singleJobPost.skills_required,
      active_status: singleJobPost.active_status,
    };
    res.json(decodedJobPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update by PATCH
exports.api_update_job_post = async (req, res, next) => {
  try {
    const { id } = req.params;
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

    const updateJob = await JobPost.findOneAndUpdate(
      { _id: id },
      {
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
      },
      { new: true }
    );
    if (!updateJob) {
      return res.status(404).json({ error: "Job is not found" });
    }
    res.json({ success: true, updateJob });
  } catch (error) {
    console.error("Error in api_single_job_post_edit:", error);
    res.status(500).json({ error: "Something went wrong" });
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
