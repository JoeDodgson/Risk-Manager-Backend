// Require in local files and npm modules
const express = require('express');
const projectRouter = require("express").Router();
const riskController = require("../../controllers/index");
const auth = require("../../middleware/auth");
// Create an express server
const app = express();

// Define passportJWT middleware

// Define routes for project CRUD operations, using the riskController
projectRouter.get("/", auth,  riskController.getAllProjects);
projectRouter.get("/:id", auth,  riskController.getProject);
projectRouter.post("/", auth,  riskController.createProject);
projectRouter.delete("/:id", auth, riskController.deleteProject);
projectRouter.get("/user/:id", auth, riskController.getProjectByUserId);

// Define routes for risk CRUD operations, using the riskController
projectRouter.post("/risk", auth, riskController.createRisk);
projectRouter.get("/risk/:id", auth, riskController.getRisk);
projectRouter.put("/risk/:id", auth, riskController.changeRisk);
projectRouter.delete("/risk/:id", auth, riskController.deleteRisk);
projectRouter.put("/risk/:id/comment", auth, riskController.createComment);
projectRouter.get("/risk/user/:id", auth, riskController.getRisksByUserId);
projectRouter.get("/risk/project/:id", auth, riskController.getRisksByProjectId);

module.exports = projectRouter;