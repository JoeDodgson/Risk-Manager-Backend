// Require in local files and npm modules
const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const userController = require("../../controllers/index")
const passportConfig = require("../../middleware/passport");

// Define passportLocal and passportJWT middleware
const passportLocal = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

// Define user login and authentication operations using userController
userRouter.post("/register", userController.createUser);
// Use passportLocal middleware for login
userRouter.post("/login", passportLocal, userController.userLogin);
// Use passportJWT middleware for logout and authenticated routes
userRouter.get("/logout", passportJWT, userController.userLogout);
userRouter.get('/authenticated', passportJWT, userController.authedUser);

// Define routes for user CRUD operations, using the riskController
userRouter.get("/info/:id", passportJWT, userController.getUser);
userRouter.put("/update/:id", passportJWT, userController.updateUser);

// Define routes for get all user (Create Project Member Use!!!)
userRouter.get("/", userController.getAllUser);

module.exports = userRouter;