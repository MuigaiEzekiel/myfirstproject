const dotenv = require("dotenv");
dotenv.config();
const database = require("../configuration/config");
const viewProfile = (req, res) => {
  const { email } = req.body;
  console.log(email);

  const fields = [email];
  const query = `SELECT * FROM patients WHERE email = (?)`; // Use ?? for field name placeholders

  database.query(query, [fields], (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).send(data);
  });
};
module.exports = viewProfile;
