const express = require('express');
const passport = require('passport');
const app = express();
const projectRouter = require("express").Router();
const riskController = require("../../controllers/index");

const passportJWT = passport.authenticate('jwt', {session : false});

// get all projects, get one single project, creating a new project and delete existing project
projectRouter.get("/", passportJWT,  riskController.getAllProjects);
projectRouter.get("/:id", passportJWT,  riskController.getProject);
projectRouter.post("/", passportJWT,  riskController.createProject);
projectRouter.delete("/:id", passportJWT, riskController.deleteProject);

// craeting risk, get them and update them
projectRouter.post("/risk", passportJWT, riskController.createRisk);
projectRouter.route("/risk/:id", passportJWT)
    .get(riskController.getRisk)
    .put(riskController.changeRisk);

module.exports = projectRouter;