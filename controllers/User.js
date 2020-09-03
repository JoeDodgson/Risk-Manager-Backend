const { User } = require("../db/index");
const signToken = require("../middleware/jwt");

module.exports = {
  // Creating register route
  userRegister: (req, res) => {
    const { email, firstName, lastName, project, company } = req.body;
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
      const { _id, email, firstName, lastName, project, company } = req.user;
      // create a JWT token using "_id"
      const token = signToken(_id);
      // setting cookie,
      // httpOnly mean you cannot touct this cookie using JavaScript(it will prevent cross-site scripting attacks)
      // sameSite property for against cross-site request forgery attacks
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { email, firstName, lastName, project, company },
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
    User.find({ _id: req.params.id })
    .then((user, err) => {
        console.log(user[0].email);
        // const { email, firstName, lastName, project, company } = user;
        // if user exist pass data with confirmation
        if (user !== null)
          res.status(201).json({
            message: {
              msgBody: "The user data is ready to analyse! ",
              msgErr: true,
            },
            data: { 
                email:user[0].email, 
                firstName : user[0].firstName, 
                lastName : user[0].lastName, 
                project : user[0].project, 
                company : user[0].company
             },
          });
      })
      .catch((err) => {
        res
          .status(422)
          .json({ message: { msgBody: "Error has occured", msgErr: true } });
      });
  },

  // Change User Data
  updateUser: (req, res) => {
    // pass in parameter should be userid
    const userid = req.body.id;
    User.update(
      { _id: userid },
      {
        $set: {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
          project: req.body.project,
          company: req.body.company,
        },
      }
    )
      .then((newUser) => {
        res.status(200).json({
          message: {
            msgBody: "All The User data successfully updated !",
            msgErr: false,
          },
          data: { newUser },
        });
      })
      .catch((err) =>
        res
          .status(422)
          .json({ message: { msgBody: "Error has occured", msgErr: true } })
      );
  },
};
// ------------- USER END -------------
