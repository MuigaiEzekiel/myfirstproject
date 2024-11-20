const database = require("../configuration/config");
const addNewDoctor = (req, res) => {
  const query = ` INSERT INTO doctors ( first_name, last_name, specialization, email, phone, schedule) VALUES('Ben',' Neves','neuralogist', 'benn@gmail.com','78777','Thursday') `;

  try {
    database.execute(query, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("Insertion successful");
      res.status(200).send("new doctor highered");
    });
  } catch (error) {
    console.log(error);
  }
};
const readDoctor = (req, res) => {
  const fields = req.query.fields
    ? req.query.fields.split(",")
    : ["first_name", "last_name", "specialization", "schedule"];
  const query = `SELECT ? FROM doctors`;

  try {
    database.execute(query, [fields], (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("successful");
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
  }
};
const updateDoctor = (req, res) => {
  const query = ` UPDATE doctors SET schedule = 'Tuesday' WHERE email = 'rodri@gmail.com' `;
  try {
    database.execute(query, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("update successful");
      res.status(200).send("doctor details updated successfully");
    });
  } catch (error) {
    console.log(error);
  }
};
const clearDoctor = (req, res) => {
  const diactivateDoctorAcc = ` DELETE FROM doctors WHERE id = '2'`;
  try {
    database.execute(updatePatientphone, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("successful");
      res.status(200).send("doctor contract expired");
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addNewDoctor, updateDoctor, readDoctor, clearDoctor };
