const { query, validationResult, matchedData } = require("express-validator");
const playgournd = (app) => {
  app.get("/play", query("person").notEmpty().escape(), (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);

      return res.send(`Hello, ${data.person}`);
    }

    res.send({ errors: result.array() });
  });
};

module.exports = playgournd;
