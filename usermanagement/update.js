const updatePatientsAcc = (req, res) => {
  const updatePatientphone = await` UPDATE patients SET phone = '929292'WHERE email = 'jim@gmail.com `;
  const updatePatientAddress = await` UPDATE patients SET address = '04' WHERE email = 'jim@gmail.com' `;
  const updatePatientGender = await` UPDATE patients SET gender = 'Female' WHERE email = 'jim@gmail.com `;
  // (first_name, last_name, email , password_hash,phone,  date_of_birth, gender, address )
  // VALUES ( 'Jim','White', 'jim@gmail.com', '123','098765', '2000','Male','123 Main St') `;
  try {
    database.query(updatePatientAddress, (err, data) => {
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
    database.query(updatePatientGender, (err, data) => {
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
exports.updatePatientsAcc;
