const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const bcryptjs = require("bcryptjs");
const path = require("path");
const router = express.Router();
dotenv.config();
const database = require("./configuration/config");
const createAccount = require("./usermanagement/register");
const loginUser = require("./usermanagement/login");
const viewProfile = require("./usermanagement/viewprofile");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const sessionStore = new MySQLStore({}, database);
//initializing session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60,
      secure: false,
    },
  })
);
const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, "project")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/startsession", (req, res) => {
  if (req.session.views) {
    req.session.user = { name: "jim", email: "jim@gmail.com" };
    res.status(200).send("welcome");
    //res.send(`${user.name},/n${user.email}`);
  }
});
//securing routes
const rightuser = (req, res) => {
  if (req.session.user) {
    return next;
  } else {
    res.send("loggin to proceed");
  }
};
//logging out
app.get("/endsession", (req, res) => {
  req.session.destroy(
    (err = {
      if(err) {
        console.log(err);
      },
    })
  );
  res.send("logged out successfully");
});
const {
  addNewDoctor,
  readDoctor,
  clearDoctor,
  updateDoctor,
} = require("./doctormanagement/doctor");
const {
  addNewAppointment,
  updateAppointment,
  showBookedAppointment,
  cancelAppointment,
} = require("./appointments/appointments");
//cerating respective tables
app.get("/createTablePatient", (req, res) => {
  const createPatient = ` CREATE TABLE IF NOT EXISTS patients (patient_id INT AUTO_INCREMENT PRIMARY KEY,first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, password_hash VARCHAR(255),phone VARCHAR(50),  date_of_birth DATE, gender VARCHAR(20), address VARCHAR(50)) `;
  database.query(createPatient, (err, data) => {
    if (err) {
      console.log("Insertion failed:", err);
      return res.status(500).send("Database error");
    }
    console.log("Insertion successful");
    res.status(200).send("Patient registered successfully");
  });
});
app.get("/createTableDoctors", (req, res) => {
  const createDoctors = ` CREATE TABLE IF NOT EXISTS doctors (doctor_id INT AUTO_INCREMENT PRIMARY KEY,first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, specialization VARCHAR(50) NOT NULL,email VARCHAR(50) NOT NULL, phone VARCHAR(50),schedule VARCHAR(50)) `;
  database.query(createDoctors, (err, data) => {
    if (err) {
      console.log("Insertion failed:", err);
      return res.status(500).send("Database error");
    }
    console.log("Insertion successful");
    res.status(200).send("doctor created successfully");
  });
});
app.get("/createTableAppointments", (req, res) => {
  const createAppointment = ` CREATE TABLE IF NOT EXISTS appointments (appointment_id INT AUTO_INCREMENT PRIMARY KEY,patient_id VARCHAR(50) NOT NULL, doctor_id VARCHAR(50) NOT NULL,appointment_date DATE, appointment_time DATETIME, status VARCHAR(50) NOT NULL) `;
  database.query(createAppointment, (err, data) => {
    if (err) {
      console.log("Insertion failed:", err);
      return res.status(500).send("Database error");
    }
    console.log("Insertion successful");
    res.status(200).send("appointment table created successfully");
  });
});
app.get("/createTableAdmin", (req, res) => {
  const createAdmin = ` CREATE TABLE IF NOT EXISTS admin (admin_id INT AUTO_INCREMENT PRIMARY KEY,user_name VARCHAR(50) NOT NULL, password_hash VARCHAR(50) NOT NULL, role VARCHAR(50) NOT NULL) `;
  database.query(createAdmin, (err, data) => {
    if (err) {
      console.log(" failed:", err);
      return res.status(500).send("Database error");
    }
    console.log("successful");
    res.status(200).send("admin table created successfully");
  });
});
app.get("/createtablesession", (req, res) => {
  const query = ` CREATE TABLE IF NOT EXISTS session (session_id VARCHAR(255) PRIMARY KEY NOT NULL , expires INT UNSIGNED NOT NULL,data text NOT NULL) `;
  database.query(query, (err, data) => {
    if (err) {
      console.log("Insertion failed:", err);
      return res.status(500).send("Database error");
    }
    console.log("Insertion successful");
    res.status(200).send("session table created successfully");
  });
});
const PORT = 3000;
//usermanagement
//1 add patient
app.post("/createaccount", createAccount);
//app.get("/registeraccount", createAccount);
app.post("/loginExistingUser", loginUser);
app.get("/viewProfileExistingUser", viewProfile);
///doctor management
//1 new doctor
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "project", "index.html"));
});
app.get("/addnewdoctor", addNewDoctor);

app.get("/readdoctor", readDoctor);
app.get("/cleardoctor", clearDoctor);
app.get("/updatedoctor", updateDoctor);
// appointment management
app.get("/addnewappointment", addNewAppointment);
app.get("/updateappointment", updateAppointment);
app.get("/showbookedappointment", showBookedAppointment);
app.get("/cancelappointment", cancelAppointment);

// app.js

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
