const { User } = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // Creates a new user
  createUser: async (req, res) => {
    // Store the data from the request
    try {
      const {
        email,
        firstName,
        lastName,
        password,
        project,
        company,
        jobTitle,
      } = req.body;
      // to check if user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser)
        return res
          .status(400)
          .json({ message: "Account with this email already exists" });

      // password hashed using bcryptjs
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // console.log(typeof hashedPassword);
      // console.log(hashedPassword.length);
      // console.log(hashedPassword);

      const newUser = new User({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        project,
        company,
        jobTitle,
      });
      const savedUser = await newUser.save();

      res.status(200).json({
        message: {
          msgBody: "Successfully Registered!",
          msgErr: false,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: {
          msgBody: "Registration Failed!",
          msgErr: true,
        },
      });
    }
  },

  // Logs the user in using passport local middleware
  userLogin: async (req, res) => {
    try {
      // deconstruct email and password from req.body
      const { email, password } = req.body;
      // Check database to see if email entered matches one in the database
      const user = await User.findOne({ email });
      // if user is not found error message sent back to front end
      if (!user) {
        return res
          .status(400)
          .json({ message: "No account with this email found!" });
      }
      // check to see if password entered matches the hashedpassword using bcryptjs compare
      const isMatch = await bcrypt.compare(password, user.password);

      // if password doesn't match send back error message
      if (!isMatch) {
        return res.status(400).json({
          isAuthenticated: false,
          message: {
            msgBody: "Invalid Credentials!",
            msgErr: true,
          },
        });
      }
      // if password matches and user is found, we will create the jwt for the user and send back user information, an isAuthenticated boolean and the generated token along with a success message
      const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5hr",
      });
      res.json({
        userToken,
        isAuthenticated: true,
        userInfo: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          project: user.project,
        },
        message: {
          msgBody: "You have successfully logged in",
          msgErr: false,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Route to prevent the user from losing authentication from state when they close the browser
  authedUser: async (req, res) => {
    
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);

      return res.json({
        isAuthed: true,
        user
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Get data for a single user
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user);
      res.status(200).json({
        message: {
          msgBody: "User successfully returned",
          msgErr: false,
        },
        user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    // Find the user in the DB using the id from req.params

    // If the user exists, return user object with a 200 'OK' code

    // If user does not exist in DB, return a 404 'Not Found' code

    // If an error was caught, return a 422 'Unprocessable Entity' code
  },

  // Get data for a single user
  getAllUser: (req, res) => {
    // Find the user in the DB using the id from req.params
    User.find({})
      .sort({ date: -1 })
      .then((UserData) =>
        // If project data was returned from the DB, return a 200 'OK' code
        res.status(200).json({
          message: {
            msgBody: "All User data successfully returned",
            msgErr: false,
          },
          data: { UserData },
        })
      )
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch((err) =>
        res.status(422).json({
          message: {
            msgBody: "Error has occured",
            msgErr: true,
          },
        })
      );
  },

  // Change user data
  updateUser: (req, res) => {
    // Store the id from req.params
    const {
      id,
      email,
      firstName,
      lastName,
      password,
      project,
      company,
    } = req.params;

    // Update the user data using Mongoose
    User.updateOne(
      { _id: id },
      {
        $set: {
          email,
          firstName,
          lastName,
          password,
          project,
          company,
        },
      }
    )
      .then((databaseChange) => {
        // If the user was updated, return the database changes with a 200 'OK' code
        if (databaseChange) {
          res.status(200).json({
            message: {
              msgBody: "User information was successfully updated",
              msgErr: false,
            },
            data: { databaseChange },
          });
        }
        // If the user was not updated, return a 404 'Not Found' code
        else {
          res.status(404).json({
            message: {
              msgBody: "User not found so the information could not be updated",
              msgErr: true,
            },
          });
        }
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch((err) =>
        res.status(422).json({
          message: {
            msgBody: "An error occured",
            msgErr: true,
          },
        })
      );
  },
};
