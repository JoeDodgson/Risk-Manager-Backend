const { User } = require("../db/index");
const signToken = require("../middleware/jwt");

module.exports = {
  // Creates a new user
  createUser : (req, res) => {
    // Store the data from the request
    const { 
      email, 
      firstName, 
      lastName, 
      password, 
      project, 
      company 
    } = req.body;

    // Find the user by their email
    User.findOne({ email }, (err, user) => {
      // If there is an error finding user, return 500 'Internal Server Error' code
      if (err) {
        res
          .status(500)
          .json({
            message: {
              msgBody: "An error occurred",
              msgErr: true,
            }
          });
      }
      // If a user with this email exists in the DB, return 406 'Not Acceptable' code
      if (user) {
        res.status(406).json({
          message: {
            msgBody: "This email is already taken",
            msgErr: true,
          },
        });
      }

      //If there is no user with that email, save as a new user
      else {
        const newUser = new User({
          email,
          firstName,
          lastName,
          password,
          project,
          company,
        });
        newUser.save(err => {
          // If there is an error saving user, return 500 'Internal Server Error' code
          if (err) {
            res
              .status(500)
              .json({
                message: {
                  msgBody: "An error occured when creating your user",
                  msgErr: true
                },
              });
          }
          // If no error occurred, new user was created so return 201 'Created' code
          else {
            res
              .status(201)
              .json({
                message: {
                  msgBody: "Account successfully created",
                  msgErr: false,
                },
              });
          }
        });
      }
    })
    // If an error was caught, return a 422 'Unprocessable Entity' code
    .catch(err =>
      res
        .status(422)
        .json({
          message: {
            msgBody: "An error occured",
            msgErr: true,
          } 
        })
    );
  },

  // Logs the user in using passport local middleware
  userLogin : (req, res) => {
    // If the request is authenticated, create a token and return in the response
    if (req.isAuthenticated()) {
      // Store the user data from the request
      const {
        _id,
        email,
        firstName,
        lastName,
        project,
        company,
      } = req.user;

      // Create a JSON Web Token using "_id"
      const token = signToken(_id);

      // Set the cookie in the response
      // Set httpOnly and sameSite as true to prevent cross-site scripting & forgery attacks
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });

      // Return a 200 'OK' code
      res
        .status(200)
        .json({
          isAuthenticated: true,
          user: { 
            _id,
            email,
            firstName,
            lastName,
            project,
            company,
          },
          message: {
            msgBody: "You have successfully logged in",
            msgErr: false,
          },
        });
    }
    // If user is not authenticated, return a 401 'Unauthorized' code
    else {
      res
        .status(401)
        .json({
          message: {
            msgBody: "Invalid login credentials",
            msgErr: true,
          }
        });
    }
  },

  // Logs the user out
  userLogout : (req, res) => {
    // Clear the 'access_token' cookie which was previously set on login
    res.clearCookie("access_token");

    // Return a 200 'OK' code and an empty user object in the response
    res
      .status(200)
      .json({ 
        user: { email: "" },
        success: true,
        message: {
          msgBody: "You have successfully logged out",
          msgErr: false,
        }
      });
  },
  
  // Route to prevent the user from losing authentication from state when they close the browser
  authedUser : (req, res) => {
    // Store the email from the request
    const { email, _id, firstName, lastName, company, project } = req.user;

    // Return a 200 'OK' code, return user object and isAuthenticated in the response
    res
      .status(200)
      .json({ 
        isAuthenticated: true,
        user: {  email, _id, firstName, lastName, company, project },
        message: {
          msgBody: "User is authenticated",
          msgErr: false,
        },
      });
  },

  // Get data for a single user
  getUser : (req, res) => {
    // Find the user in the DB using the id from req.params
    User.find({ _id: req.params.id })
      .then((user, err) => {       
        // If the user exists, return user object with a 200 'OK' code 
        if (user) {
          res
            .status(200)
            .json({
              message: {
                msgBody: "User successfully returned",
                msgErr: false,
              },
              data: { 
                  email: user[0].email,
                  firstName : user[0].firstName,
                  lastName : user[0].lastName,
                  project : user[0].project,
                  company : user[0].company,
              },
            });
        }
        // If user does not exist in DB, return a 404 'Not Found' code
        else {
        res
          .status(404)
          .json({
            message: {
              msgBody: "User not found",
              msgErr: true,
            }
          });
        }
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch(err =>
        res
          .status(422)
          .json({
            message: {
              msgBody: "An error occured",
              msgErr: true,
            } 
          })
      );
  },

  // Get data for a single user
  getAllUser : (req, res) => {
    // Find the user in the DB using the id from req.params
    User.find({})
      .sort({ date: -1 })
      .then(UserData =>
        // If project data was returned from the DB, return a 200 'OK' code
        res
          .status(200)
          .json({
            message: {
              msgBody: "All User data successfully returned",
              msgErr: false,
            },
            data: { UserData },
        })
      )
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch(err =>
        res
          .status(422)
          .json({
            message: {
              msgBody: "Error has occured",
              msgErr: true
            }
          })
      );
  },

  // Change user data
  updateUser : (req, res) => {
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
      .then(databaseChange => {
        // If the user was updated, return the database changes with a 200 'OK' code
        if (databaseChange) {
          res
            .status(200)
            .json({
              message: {
                msgBody: "User information was successfully updated",
                msgErr: false,
              },
              data: { databaseChange },
            });
        }
        // If the user was not updated, return a 404 'Not Found' code
        else {
          res
            .status(404)
            .json({
              message: {
                msgBody: "User not found so the information could not be updated",
                msgErr: true,
              },
            });
        }
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch(err =>
        res
          .status(422)
          .json({
            message: {
              msgBody: "An error occured",
              msgErr: true,
            } 
          })
      );
  },
};

