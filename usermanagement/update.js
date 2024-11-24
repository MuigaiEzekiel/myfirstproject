const bcrypt = require("bcryptjs");

const updatePatientsAcc = async (req, res) => {
  const { updatedName, UpdatedEmail, updatedPhone, password } = await req.body;
  const hashed_password = await bcrypt.hash(password, 4);
  const updatePatientphone = ` UPDATE patients SET phone = '?'WHERE password = ${hashed_password} `;
  const updatePatientEmail = ` UPDATE patients SET address = '' WHERE password = ${hashed_password} `;
  const updatePatientName = ` UPDATE patients SET gender = 'Female' WHERE password = ${hashed_password} `;

  try {
    const params = [UpdatedEmail];
    database.query(updatePatientEmail, params, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("Insertion successful");
      res.status(200).send("Patient address successfully");
    });
  } catch (error) {
    console.log(error);
  }
  try {
    const params = updatedPhone;
    database.query(updatePatientphone, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("Insertion successful");
      res.status(200).send("Patient phone updated successfully");
    });
  } catch (error) {
    console.log(error);
  }
  try {
    const params = [updatedName];
    database.query(updatePatientName, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("Insertion successful");
      res.status(200).send("Patient gender updated successfully");
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = updatePatientsAcc;
