const bcrypt = require("bcryptjs");
// const dotenv = require("dotenv");
// dotenv.config();
const { request } = require("express");
const database = require("../configuration/config");
const createAccount = async function (req, res) {
  const {
    fname,
    lname,
    email,
    password,
    phone,
    date_of_birth,
    gender,
    address,
  } = req.body;
  try {
    // const hashed_password = bcrypt.hash("1234", 10);

    const registerNewPatient = ` INSERT INTO patients
  (first_name, last_name, email, password_hash, phone,  date_of_birth, gender, address )
     VALUES (?,?,?,?,?,?,?,?)`;
    const hashed_password = await bcrypt.hash(password, 4);
    const params = [
      fname,
      lname,
      email,
      hashed_password,
      phone,
      date_of_birth,
      gender,
      address,
    ];
    database.execute(registerNewPatient, params, (err, data) => {
      if (err) {
        console.log("Insertion failed:", err);
        return res.status(500).send("Database error");
      }
      console.log("Insertion successful");
      res.status(200).send("Patient registered successfully");
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = createAccount;
