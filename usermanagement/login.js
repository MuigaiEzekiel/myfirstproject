const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();
const database = require("../configuration/config");
const loginUser = function (req, res) {
  const { email, password } = req.body;
  // Prepare query to check if user exists
  const query = `SELECT * FROM patients WHERE email = (?)`;

  const params = [email];
  try {
    // Perform the query
    database.query(query, params, (err, data) => {
      if (err) {
        // Handle database errors
        console.log("Database error:", err);
        return res
          .status(500)
          .send("An error occurred while querying the database");
      }

      if (data === 0) {
        return res.status(400).send("user not found");
      }
      const users = {};
      // User found, now compare the password
      const user = users[email]; // Assuming the result is an array and the user is the first result

      //Optional: Compare hashed password (using bcrypt or another library)
      bcrypt.compare(password, user.password_hash, (compareErr, isMatch) => {
        if (compareErr) {
          console.log("Error comparing password:", compareErr);
          return res.status(500).send("Password comparison error");
        }

        if (!isMatch) {
          return res.status(400).send("Invalid email/password combination");
        }

        console.log("User logged in successfully");
        res.status(200).send("Login successful");
        const user = users[req.session.user];
        console.log(user);
      });
    });
  } catch (error) {
    console.log("An error occurred:", error);
    res.status(500).send("Internal server error");
  }
};

//module.exports = loginUser;
