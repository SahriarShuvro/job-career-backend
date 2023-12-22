// *****  Auth page start ***** //
exports.sign_up = (req, res) => {
  try {
    res.render("./pages/admin/signUp");
  } catch (err) {
    console.log(err);
  }
};
exports.sign_in = (req, res) => {
  try {
    res.render("./pages/admin/signIn");
  } catch (err) {
    console.log(err);
  }
};
// *****  Auth page end ***** //
