const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../middleware/passport");
require('dotenv').config();
const JWT = require("jsonwebtoken");
const User = require("../db/models/user");

// userID is primary key
const signToken = (userID) => {
  // will return actual JWT token
  // we can send any data inside payload but not info like credict cards
  return JWT.sign(
    {
      // who issue this JWT token
      iss: process.env.JWT_ISSUE,
      // who is this token for
      sub: userID,
      // this risk manager must be same as secretOrKey
    },
    process.env.SECRET_OR_KEY,
    { expiresIn: '5hr' }
  );
};

// Creating register route
userRouter.post("/register", (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  // Find User by email
  User.findOne({ email }, (err, user) => {
    // if there is an error finding user
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgErr: true } });
    // if user exists in DB, can't save to DB
    if (user)
      res
        .status(400)
        .json({
          message: { msgBody: "Email is already taken", msgErr: true },
        });
    else {
      //If there is no User with that emai, save as a new user
      const newUser = new User({ email, firstName, lastName, password });
      newUser.save((err) => {
        if (err)
          // if error occurs when saving to DB
          res
            .status(500)
            .json({ message: { msgBody: "Error has occured", msgErr: true } });
        else {
          // without errors user saved to DB
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
  });
});

// use passport local middleware
//server will not maintaining the session
userRouter.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
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
      res
        .status(200)
        .json({
          isAuthenticated: true,
          user: { email, firstName, lastName, password },
        });
    }
  }
);

//Creating the logout route
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { email: "" }, success: true });
  }
);

    // this isAuthenticated function use to persist authentican
    // once user login state in the react app will know user has been authenticated, but when user close the app, the state will be gone.
    // using this endpoint, when user visit the website next time user will still stay login
userRouter.get('/authenticated', passport.authenticate('jwt', {session : false}), (req, res) =>{
    const {email} = req.user;
    res.status(200).json({isAuthenticated : true, user: {email}});
});

module.exports = userRouter;
