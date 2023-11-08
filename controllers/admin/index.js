exports.dashboard_c_get = (req, res) => {
  res.render("./pages/admin/index", {
    title: "Dashboard | All Job BD",
  });
};

// *****  Job Post page start ***** //
// Get
exports.job_post_c_get = (req, res) => {
  try {
    res.render("./pages/admin/jobPost", {
      title: "Dashboard | All Job BD",
    });
  } catch (err) {
    console.error(err);
  }
};
// *****  Job Post page end ***** //

// *****  Copmany page start ***** //
// Get
exports.company_c_get = (req, res) => {
  try {
    res.render("./pages/admin/companies", {
      title: "Companies | All Job BD",
    });
  } catch (err) {
    console.log(err);
  }
};

// *****  Copmany page end ***** //

// *****  Blog page start ***** //
// Get
exports.blog_c_get = (req, res) => {
  try {
    res.render("./pages/admin/blog", {
      title: "Blogs | All Job BD",
    });
  } catch (err) {
    console.log(err);
  }
};
// *****  Blog page end ***** //
