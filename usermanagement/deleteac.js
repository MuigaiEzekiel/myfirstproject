const database = require("../server/database");
const deleteUser = function (req, res) {
  try {
    const deleteExistingUser = `DELETE FROM patients WHERE patient_id = '1'`;
    database.query(deleteExistingUser, (err, data) => {
      if (err) {
        console.log(" failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("Insertion successful");
      res.status(200).send("Account successfully deleted");
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = deleteUser;
