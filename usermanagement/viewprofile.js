const dotenv = require("dotenv");
dotenv.config();
const database = require("../configuration/config");
const viewProfile = (req, res) => {
  const fields = req.query.fields
    ? req.query.fields.split(",")
    : ["first_name", "last_name", "email", "gender", "date_of_birth"];
  const query = `SELECT ?? FROM patients`; // Use ?? for field name placeholders

  database.query(query, [fields], (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).send(data);
  });
};
module.exports = viewProfile;
