const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../../middleware/passport");
const userController = require("../../controllers/index")

//server will not maintaining the session
const passportLocal = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

// Creating register route
userRouter.post("/register", userController.userRegister);

// use passport local middleware
userRouter.post("/login", passportLocal, userController.userLogin);

//Creating the logout route
userRouter.get("/logout", passportJWT, userController.userLogout);

// this isAuthenticated function use to persist authentican
// once user login state in the react app will know user has been authenticated, but when user close the app, the state will be gone.
// using this endpoint, when user visit the website next time user will still stay login
userRouter.get('/authenticated', passportJWT, userController.authedUser);
// get user info route
userRouter.get("/info/:id", passportJWT, userController.getUserData);
// update info route
userRouter.put("/update/:id", passportJWT, userController.updateUser);

module.exports = userRouter;
