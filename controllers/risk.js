// Import the Risk 
const { Risk } = require("../db/index");

module.exports = {
  // Create a risk
  createRisk : (req, res) => {
    // Store the requested new risk title from the request
    const { title } = req.body;
    // Before creating new risk, check if it exists
    Risk.findOne({ title })
      .then(data => {
        // If a risk with this title exists in the DB, return 406 'Not Acceptable' code
        if (data) {
          res
            .status(406)
            .json({
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
              res
                .status(500)
                .json({
                  message: { 
                    msgBody: "An error occured when creating your new risk",
                    msgErr: true,
                  },
                });
            }
            // If no error occurred, new risk was created so return 201 'Created' code
            else {
              res
                .status(201)
                .json({
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
      .catch(err =>
        res
          .status(422)
          .json({
            message: {
              msgBody: "An error occured",
              msgErr: true,
            } 
          })
      );
  },

  // Get data of a single risk
  getRisk : (req, res) => {
    Risk.findById(req.params.id)
      .then((risk, err) => {

        // If risk exists in DB return to the user with 200 'OK' code
        if (risk) {
          res
            .status(200)
            .json({
              message: {
                msgBody: "Risk successfully returned",
                msgErr: false,
              },
              data: { risk },
            });
        }
        // If risk does not exist in DB, return a 404 'Not Found' code
        else {
          res
            .status(404)
            .json({
              message: {
                msgBody: "Risk not found",
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

  // Get data of a single risk by project id
  getRisksByProjectId : (req, res) => {
    // Store the project id from req.params
    const { id } = req.params;

    Risk.find({})
      .then(allRisks => {
        if (allRisks) {
          // Filter the risks by the projectId
          const projectRisks = allRisks.filter(risk => risk.projectId === id);
          
          // If risk data was returned from the DB, return a 200 'OK' code
          res
            .status(200)
            .json({
              message: {
                msgBody: "Risks for the specified project have been successfully returned",
                msgErr: false,
              },
              data: { projectRisks },
            });
        }
        // If risk data was not returned, return a 404 'Not Found' code
        else {
          res
            .status(404)
            .json({
              message: {
                msgBody: "No risks found",
                msgErr: true,
              },
            });
        }
      })
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
  
  // Change risk data
  changeRisk : (req, res) => {
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
          risk
        },
      })
      .then(updatedRisk => {
        // If risk was successfully updated in DB, return to the user with 200 'OK' code
        res
          .status(200)
          .json({
            message: {
              msgBody: "Risk successfully updated",
              msgErr: false,
            },
            data: { updatedRisk },
          });
      })
      // If an error was caught, return a 422 'Unprocessable Entity' code
      .catch(err =>
        res
          .status(422)
          .json({
            message: {
              msgBody: "An error occured",
              msgErr: true,
            }
          })
      );
  },
      
  // Delete a risk by its id
  deleteRisk : (req, res) => {
    // Check if the risk exists in the DB using the id from req.params
    Risk.findById(req.params.id)
      // Then remove it using remove method
      .then(data => {
        // If no risk exists with this id, return a 406 'Not Acceptable' code
        if (!data) {
          res
            .status(406)
            .json({
              message: {
                msgBody: "A Risk with this title already exists",
                msgErr: true,
              },
            });
        }
        // If the risk exists, delete it, return the deleted risk with a 200 'OK' code
        else {
          data.remove()
            .then(deletedRisk => {
              res
                .status(200)
                .json({
                  message: {
                    msgBody: "Risk successfully deleted",
                    msgErr: false,
                  },
                  data: { deletedRisk },
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
              msgBody: "An error occured when deleting your risk",
              msgErr: true,
            }
          })
      );
  },
};
    