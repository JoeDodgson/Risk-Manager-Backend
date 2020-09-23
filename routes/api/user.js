// Require in local files and npm modules
const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/index")
const auth = require("../../middleware/auth");
// Define user login and authentication operations using userController
userRouter.post("/register", userController.createUser);
// Use passportLocal middleware for login
userRouter.post("/login", userController.userLogin);
// Use passportJWT middleware for logout and authenticated routes
userRouter.get("/logout", auth, userController.userLogout);
userRouter.get('/authenticated', userController.authedUser);

// Define routes for user CRUD operations, using the riskController
userRouter.get("/info/:id", auth, userController.getUser);
userRouter.put("/update/:id", auth, userController.updateUser);

// Define routes for get all user (Create Project Member Use!!!)
userRouter.get("/", userController.getAllUser);

module.exports = userRouter;