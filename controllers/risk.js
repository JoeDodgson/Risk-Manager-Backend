// Require in Mongoose models
const { Risk, Project } = require("../db/index");

module.exports = {
  // Create a risk
  createRisk: (req, res) => {
    // Store the requested new risk title from the request
    const { title } = req.body;
    // Before creating new risk, check if it exists
    Risk.findOne({ title })
      .then((data) => {
        // If a risk with this title exists in the DB, return 406 'Not Acceptable' code
        if (data) {
          res.status(406).json({
            message: {
              msgBody: "A risk with this title already exists",
              msgErr: true,
            },
          });
        }
        // Else save the new risk to the collection using Mongoose
        else {
          const {
            title,
            riskId,
            description,
            designDiscipline,
            status,
            location,
            likelihood,
            severity,
            risk,
            projectId,
          } = req.body;

          const newRisk = new Risk({
            title,
            riskId,
            description,
            designDiscipline,
            status,
            location,
            likelihood,
            severity,
            risk,
            projectId,
          });

          newRisk.save((err, newRiskData) => {
            // If error occurs when saving to DB, return 500 'Internal Server Error' code
            if (err) {
              res.status(500).json({
                message: {
                  msgBody: "An error occured when creating your new risk",
                  msgErr: true,
                },
              });
            }
            // If no error occurred, new risk was created so return 201 'Created' code
            else {
              res.status(201).json({
                message: {
                  msgBody: "Your new risk was successfully created",
                  msgErr: false,
                },
                data: { newRiskData },
              });
            }
          });
        }
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch((err) =>
        res.status(422).json({
          message: {
            msgBody: "An error occured",
            msgErr: true,
          },
        })
      );
  },

  // Get data of a single risk
  getRisk: (req, res) => {
    Risk.findById(req.params.id)
      .then((risk, err) => {
        // If risk exists in DB return to the user with 200 'OK' code
        if (risk) {
          res.status(200).json({
            message: {
              msgBody: "Risk successfully returned",
              msgErr: false,
            },
            data: { risk },
          });
        }
        // If risk does not exist in DB, return a 404 'Not Found' code
        else {
          res.status(404).json({
            message: {
              msgBody: "Risk not found",
              msgErr: true,
            },
          });
        }
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch((err) => {
        res.status(422).json({
          message: {
            msgBody: "An error occured",
            msgErr: true,
          },
        });
      });
  },

  // Get risks by project id
  getRisksByProjectId: (req, res) => {
    // Store the project id from req.params
    const id = req.params.id;

    Risk.find({})
      .then((allRisks) => {
        if (allRisks) {
          // Filter the risks by the projectId
          const projectRisks = allRisks.filter(
            (risk) => JSON.stringify(risk.projectId).replace(/"/g, "") === id
          );

          // If risk data was returned from the DB, return a 200 'OK' code
          res.status(200).json({
            message: {
              msgBody:
                "Risks for the specified project have been successfully returned",
              msgErr: false,
            },
            data: { projectRisks },
          });
        }
        // If risk data was not returned, return a 404 'Not Found' code
        else {
          res.status(404).json({
            message: {
              msgBody: "No risks found",
              msgErr: true,
            },
          });
        }
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch((err) =>
        res.status(422).json({
          message: {
            msgBody: "Error has occured",
            msgErr: true,
          },
        })
      );
  },

  // Get risks of projects which the user is a team member of
  getRisksByUserId: (req, res) => {
    // Store the user id from req.params
    let id = req.params.id;
    id = id.replace(/\n/g, "");

    let usersProjectIds;
    let usersProjects = [];

    // Search the DB for all projects
    Project.find({})
      .then((allProjects) => {
        if (allProjects) {
          // Filter the projects by the userId
          for (let i = 0; i < allProjects.length; i++) {
            for (let j = 0; j < allProjects[i].teamMembers.length; j++) {
              if (allProjects[i].teamMembers[j][0]._id === id) {
                usersProjects.push(allProjects[i]);
              }
            }
          }
          // Map to an array of projectIds
          usersProjectIds = usersProjects.map((project) => project._id);
        }
        // If the project was not returned, return a 404 'Not found' code
        else {
          res.status(404).json({
            message: {
              msgBody: "Not found",
              msgErr: true,
            },
          });
        }
      })
      .then(() => {
        Risk.find({}).then((allRisks) => {
          if (allRisks) {
            // Filter the risks by the user's projectIds
            let userRisks = [];
            for (let i = 0; i < allRisks.length; i++) {
              for (let j = 0; j < usersProjectIds.length; j++) {
                if (
                  JSON.stringify(allRisks[i].projectId).replace(/"/g, "") ===
                  JSON.stringify(usersProjectIds[j]).replace(/"/g, "")
                ) {
                  userRisks.push(allRisks[i]);
                }
              }
            }

            // If risk data was returned from the DB, return a 200 'OK' code
            res.status(200).json({
              message: {
                msgBody:
                  "Risks for the specified user have been successfully returned",
                msgErr: false,
              },
              data: { userRisks },
            });
          }
          // If risk data was not returned, return a 404 'Not Found' code
          else {
            res.status(404).json({
              message: {
                msgBody: "No risks found",
                msgErr: true,
              },
            });
          }
        });
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch((err) =>
        res.status(422).json({
          message: {
            msgBody: "Error has occured",
            msgErr: true,
          },
        })
      );
  },

  // Change risk data
  changeRisk: (req, res) => {
    // Store the data from the request body
    const {
      title,
      riskId,
      description,
      designDiscipline,
      status,
      location,
      comments,
      likelihood,
      severity,
      risk,
    } = req.body;

    // Store the risk DB id from the request params
    const _id = req.params.id;

    // Update the risk in the database using _id and the requested data
    Risk.findOneAndUpdate(
      { _id },
      {
        $set: {
          title,
          riskId,
          description,
          designDiscipline,
          status,
          location,
          comments,
          likelihood,
          severity,
          risk,
        },
      }
    )
      .then((updatedRisk) => {
        // If risk was successfully updated in DB, return to the user with 200 'OK' code
        res.status(200).json({
          message: {
            msgBody: "Risk successfully updated",
            msgErr: false,
          },
          data: { updatedRisk },
        });
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch((err) =>
        res.status(422).json({
          message: {
            msgBody: "An error occured",
            msgErr: true,
          },
        })
      );
  },

  // Delete a risk by its id
  deleteRisk: (req, res) => {
    // Check if the risk exists in the DB using the id from req.params
    Risk.findById(req.params.id)
      // Then remove it using remove method
      .then((data) => {
        // If no risk exists with this id, return a 406 'Not Acceptable' code
        if (!data) {
          res.status(406).json({
            message: {
              msgBody: "A Risk with this title already exists",
              msgErr: true,
            },
          });
        }
        // If the risk exists, delete it, return the deleted risk with a 200 'OK' code
        else {
          data.remove().then((deletedRisk) => {
            res.status(200).json({
              message: {
                msgBody: "Risk successfully deleted",
                msgErr: false,
              },
              data: { deletedRisk },
            });
          });
        }
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch((err) =>
        res.status(422).json({
          message: {
            msgBody: "An error occured when deleting your risk",
            msgErr: true,
          },
        })
      );
  },

  // Create a comment.
  // Finds the risk, then updates the comment property by pushing the new comment into the existing comment array
  createComment: (req, res) => {
    // Store the data from the request body
    const { user, content, dateRaised } = req.body;

    const newComment = {
      user,
      content,
      dateRaised,
    };

    // Store the risk DB id from the request params. Remove new line character
    let _id = req.params.id;
    _id = _id.replace(/\n/g, "");

    // Get the risk from the DB
    Risk.findById(_id)
      .then((risk, err) => {
        if (risk) {
          // Push the new comment into the existing comment array
          let updatedComments = risk.comments;
          updatedComments.push(newComment);

          // Update the risk in the database using _id and the requested data
          Risk.findOneAndUpdate(
            { _id },
            {
              $set: {
                comments: updatedComments,
              },
            }
          ).then((data) => {
            // If risk was successfully updated in DB, return to the user with 200 'OK' code
            res.status(200).json({
              message: {
                msgBody: "Comment successfully added",
                msgErr: false,
              },
              data: { updatedComments },
            });
          });
        } else {
          // If the risk was not returned, return a 404 'Not found' code
          res.status(404).json({
            message: {
              msgBody: "Risk not found in database. Comment could not be added",
              msgErr: true,
            },
          });
        }
      })

      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch((err) =>
        res.status(422).json({
          message: {
            msgBody: "An error occured",
            msgErr: true,
          },
        })
      );
  },
};
