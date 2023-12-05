const he = require("he");
const JobPost = require("../models/jobSchema/JobAdd");

const decodeJobPost = (jobPost) => ({
  _id: jobPost._id,
  job_title: String(he.decode(jobPost.job_title)),
  start_date: jobPost.start_date,
  end_date: jobPost.end_date,
  company: String(he.decode(jobPost.company)),
  job_location: String(he.decode(jobPost.job_location)),
  qualification: String(he.decode(jobPost.qualification)),
  employment_status: String(he.decode(jobPost.employment_status)),
  offerd_salary: Number(jobPost.offerd_salary),
  salary_negotiable: jobPost.salary_negotiable,
  category: String(he.decode(jobPost.category)),
  vacancy: Number(jobPost.vacancy),
  industry: String(he.decode(jobPost.industry)),
  experience: String(he.decode(jobPost.experience)),
  gender: String(he.decode(jobPost.gender)),
  job_details: String(he.decode(jobPost.job_details)),
  skills_required: String(he.decode(jobPost.skills_required)),
  active_status: jobPost.active_status,
  createdAt: jobPost.createdAt,
  updatedAt: jobPost.updatedAt,
});

const getAllJobs = async (model, page, limit) => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await model
      .find()
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(startIndex)
      .exec();
    // Count total number of items in the collection
    const totalItems = await model.countDocuments();
    // Calculate total number of pages
    const totalPages = Math.ceil(totalItems / limit);

    // Count total number of active items
    const totalActiveItems = await model.countDocuments({
      active_status: true,
    });

    // Count total number of inactive items
    const totalInactiveItems = totalItems - totalActiveItems;

    return {
      totalItems,
      totalPages,
      totalActiveItems,
      totalInactiveItems,
      results,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = getAllJobs;
