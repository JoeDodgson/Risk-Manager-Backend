// Require in local files and npm modules
const express = require('express');
const passport = require('passport');
const projectRouter = require("express").Router();
const riskController = require("../../controllers/index");

// Create an express server
const app = express();

// Define passportJWT middleware
const passportJWT = passport.authenticate('jwt', {session : false});

// Define routes for project CRUD operations, using the riskController
projectRouter.get("/", passportJWT,  riskController.getAllProjects);
projectRouter.get("/:id", passportJWT,  riskController.getProject);
projectRouter.post("/", passportJWT,  riskController.createProject);
projectRouter.delete("/:id", passportJWT, riskController.deleteProject);
projectRouter.get("/user/:id", passportJWT, riskController.getProjectByUserId);

// Define routes for risk CRUD operations, using the riskController
projectRouter.post("/risk", passportJWT, riskController.createRisk);
projectRouter.get("/risk/:id", passportJWT, riskController.getRisk);
projectRouter.put("/risk/:id", passportJWT, riskController.changeRisk);
projectRouter.delete("/risk/:id", passportJWT, riskController.deleteRisk);
projectRouter.put("/risk/:id/comment", passportJWT, riskController.createComment);
projectRouter.get("/risk/user/:id", passportJWT, riskController.getRisksByUserId);
projectRouter.get("/risk/project/:id", passportJWT, riskController.getRisksByProjectId);

module.exports = projectRouter;