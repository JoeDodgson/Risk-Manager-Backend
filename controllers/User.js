const { User } = require("../db/index");
const signToken = require("../middleware/jwt");

module.exports = {
  // Creating register route
  userRegister: (req, res) => {
    const { email, firstName, lastName, password, project, company } = req.body;
    // Find User by email
    User.findOne({ email }, (err, user) => {
      // if there is an error finding user
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgErr: true } });
      // if user exists in DB, can't save to DB
      if (user)
        res.status(400).json({
          message: { msgBody: "Email is already taken", msgErr: true },
        });
      else {
        //If there is no User with that emai, save as a new user
        const newUser = new User({
          email,
          firstName,
          lastName,
          password,
          project,
          company,
        });
        newUser.save((err) => {
          if (err)
            // if error occurs when saving to DB
            res
              .status(500)
              .json({
                message: { msgBody: "Error has occured", msgErr: true },
              });
          else {
            // without errors user saved to DB
            res.status(201).json({
              message: {
                msgBody: "Account successfully created",
                msgErr: false,
              },
            });
          }
        });
      }
    });
  },

  // use passport local middleware
  //server will not maintaining the session
  userLogin: (req, res) => {
    // if authenticated
    if (req.isAuthenticated()) {
      // get the user info from user object
      const { _id, email, firstName, lastName, password } = req.user;
      // create a JWT token using "_id"
      const token = signToken(_id);
      // setting cookie,
      // httpOnly mean you cannot touct this cookie using JavaScript(it will prevent cross-site scripting attacks)
      // sameSite property for against cross-site request forgery attacks
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { email, firstName, lastName, password },
      });
    }
  },

  //Creating the logout route
  userLogout: (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { email: "" }, success: true });
  },

  // this isAuthenticated function use to persist authentican
  // once user login state in the react app will know user has been authenticated, but when user close the app, the state will be gone.
  // using this endpoint, when user visit the website next time user will still stay login
  authedUser: (req, res) => {
    const { email } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { email } });
  },

  // Get single user info
  getUserData: (req, res) => {
    User.find({ _id: userid })
      .then((userData) => {
        console.log("\n Success \n -------DATA BELOW-------");
        console.log(userData);
        return userData;
      })
      .catch((err) => {
        console.log("failed");
        return err;
      });
  },

  // Change User Data
  updateUser: (req, res) => {
    // pass in parameter should be userid
    const userid = req.body.userid;
    User.update(
      { _id: userid },
      {
        $set: {
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          password: body.password,
          designDiscipline: body.designDiscipline,
          authorisation: body.authorisation,
          project: body.project,
          company: body.company,
        },
      }
    )
      .then(console.log("-------update success-------"))
      .catch((err) => {
        console.log("---Update failed---");
        console.log(err);
      });
  },
};
// ------------- USER END -------------
