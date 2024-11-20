const database = require("../configuration/config");
const addNewAppointment = (req, res) => {
  const query = ` INSERT INTO appointments ( patient_id, doctor_id, appointment_date, appointment_time, status) VALUES('1','1','2020-01-12', '2020-01-12 08:00:03', 'canceled') `;

  try {
    database.execute(query, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("appointment booked");
      res.status(200).send("appointment booked");
    });
  } catch (error) {
    console.log(error);
  }
};
const updateAppointment = (req, res) => {
  const query = ` UPDATE appointments SET status = 'canceled' WHERE appointment_id = '1' `;

  try {
    database.execute(query, [fields], (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log(" appointment updated successfully");
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
  }
};
const showBookedAppointment = (req, res) => {
  const query = ` SELECT appointment_date, appointment_time, status FROM appointments WHERE appointment_id = '1'`;
  try {
    database.execute(query, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("update successful");
      res.status(200).send("these are your appointment details");
    });
  } catch (error) {
    console.log(error);
  }
};
const cancelAppointment = (req, res) => {
  const query = ` DELETE FROM appointments WHERE id = '1'`;
  try {
    database.execute(query, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("successful");
      res.status(200).send("appointment cancelled ");
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addNewAppointment,
  updateAppointment,
  showBookedAppointment,
  cancelAppointment,
};
