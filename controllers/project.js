// Require in Mongoose model
const { Project } = require("../db/index");
const { json } = require("express");

module.exports = {

  // Get all the projects from the DB. Sort by date
  getAllProjects : (req, res) => { 
    Project.find({})
      .sort({ date: -1 })
      .then(projectsData =>
        // If project data was returned from the DB, return a 200 'OK' code
        res
          .status(200)
          .json({
            message: {
              msgBody: "All project data successfully returned",
              msgErr: false,
            },
            data: { projectsData },
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

  // Get the data of a single project  
  getProject : (req, res) => {
    // Search the database for the project using id from req.params
    Project.findById(req.params.id)
      .then((project, err) => {
        // If the project was successfully returned, return a 200 'OK' code
        if (project) {
          res
            .status(200)
            .json({
              message: {
                msgBody: "Project data successfully returned",
                msgErr: false,
              },
              data: { project },
            });
        }
        // If the project was not returned, return a 404 'Not found' code
        else {
          res
            .status(404)
            .json({
              message: {
                msgBody: "Project not found",
                msgErr: true,
              }
            });
        }
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch(err => {
        res
          .status(422)
          .json({
            message: {
              msgBody: "An error occured",
              msgErr: true,
            }
          });
      });
  },

  // Get the data of a single project  
  getProjectByUserId : (req, res) => {
    // Store the user id from req.params
    let { id } = req.params;

    // remove new line charactor from user id
    id = id.replace(/\n/g, "");    
    // Search the DB for all projects
    Project.find({})
    .then(allProjects => {
      let usersProjects = [];
      if (allProjects) {
        // Filter the projects by the userId
        for (let i = 0; i < allProjects.length; i++) {
          for (let j = 0; j < allProjects[i].teamMembers.length; j++) {
            if (allProjects[i].teamMembers[j][0]._id === id) {
              usersProjects.push(allProjects[i]);
            }
          }
        }
        // Return the user's projects data with a 200 'OK' code
        res
          .status(200)
          .json({
            message: {
              msgBody: "Project data successfully returned",
              msgErr: false,
            },
            data: { usersProjects },
          });
      }
      // If the project was not returned, return a 404 'Not found' code
      else {
        res
          .status(404)
          .json({
            message: {
              msgBody: "Project not found",
              msgErr: true,
            }
          });
      }
    })
    // If an error was caught, return a 422 'Unprocessable Entity' code
    .catch(err => {
      res
        .status(422)
        .json({
          message: {
            msgBody: "An error occured",
            msgErr: true,
          }
        });
    });
  },

  // Create a new project
  createProject : (req, res) => {
    // Store the title from the request body
    const { title } = req.body;

    // Before creating a new project, check if one already exists with this title
    Project.findOne({ title })
      .then(data => {
        // If a project already exists with this title, return a 406 'Not Acceptable' code
        if (data) {
          res
            .status(406)
            .json({
              message: {
                msgBody: "A project with this title already exists",
                msgErr: true,
              },
            });
        }
        // Else save the new project to the collection using Mongoose
        else {
          const {
            title,
            description,
            location,
            startDate,
            endDate,
            client,
            teamMembers,
          } = req.body;

          const newProject = new Project({
            title,
            description,
            location,
            startDate,
            endDate,
            client,
            teamMembers,
          });

          newProject.save((err, newProjectData) => {
            if (err) {
              // If error occurs when saving to DB, return 500 'Internal Server Error' code
              res
                .status(500)
                .json({
                  message: { 
                    msgBody: "An error occured when creating your new project",
                    msgErr: true,
                  }
                });
            }
            else {
              // If no error occurred, new risk was created so return 201 'Created' success code
              res
                .status(201)
                .json({
                  message: {
                    msgBody: "You new project was successfully created",
                    msgErr: false,
                  },
                  data: { newProjectData }
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
              msgBody: "An error occured when creating your project",
              msgErr: true,
            }
          })
      );
  },

  // Delete a project by its id
  deleteProject : (req, res) => {
    // Check if the project exists in the DB using the id from req.params
    Project.findById(req.params.id)
      // Then remove it using remove method
      .then(data => {
        // If no project exists with this id, return a 406 'Not Acceptable' code
        if (!data) {
          res
            .status(406)
            .json({
              message: {
                msgBody: "A project with this title already exists",
                msgErr: true,
              },
            });
        }
        // If the project exists, delete it, return the deleted project with a 200 'OK' code
        else {
          data.remove()
            .then(deletedProject => {
              res
                .status(200)
                .json({
                  message: {
                    msgBody: "Project successfully deleted",
                    msgErr: false,
                  },
                  data: { deletedProject },
                });
            })
        }
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch(err =>
        res
          .status(422)
          .json({
            message: {
              msgBody: "An error occured when deleting your project",
              msgErr: true,
            }
          })
      );
  }
}
