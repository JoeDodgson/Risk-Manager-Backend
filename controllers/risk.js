// Import the Risk 
const { Risk } = require("../db/index");

module.exports = {
  // Create a risk
  createRisk: (req, res) => {
    // Store the requested new risk title from the request
    const { title } = req.body;

    // Before creating new risk, check if it exists
    Risk.findOne({ title }).then((data) => {
      // If the risk exists in the DB, return 'bad request' 400 code
      if (data) {
        res.status(400).json({
          message: {
            msgBody: "This Risk is already start taking control",
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
          if (err) {
            // If error occurs when saving to DB, return 500 'Internal Server Error' code
            res.status(500).json({
              message: { 
                msgBody: "An error occured creating your new risk",
                msgErr: true,
              },
            });
          }
          else {
            // If no error occurred, new risk was created so return 201 'Created' success code
            res.status(201).json({
              message: {
                msgBody: "New risk successfully created",
                msgErr: false,
              },
              data: { newRiskData },
            });
          }
        });
      }
    });
  },

  // Get data of a single risk
  getRisk: (req, res) => {
    Risk.findById(req.params.id)
      .then((risk, err) => {
        // If risk exists in DB return to the user with 200 'OK' code
        if (risk)
          res.status(200).json({
            message: {
              msgBody: "Risk successfully returned",
              msgErr: false,
            },
            data: { risk },
          });
      })
      // If the risk ID could not be found in the DB, return a 404 'Not Found' code
      .catch((err) => {
        res
          .status(404)
          .json({ 
            message: {
              msgBody: "Risk not found",
              msgErr: true,
            }
          });
      });
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
          risk
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
    .catch((err) =>
      // If the risk was not updated in the DB, return a 422 'Unprocessable Entity' code
      res
        .status(422)
        .json({
          message: {
            msgBody: "Error has occured",
            msgErr: true,
          } 
        })
    );
  },
};
