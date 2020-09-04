const { Risk } = require("../db/index");

module.exports = {
// create a risk
  createRisk: (req, res) => {
    const {title} = req.body;
    //  before create a new risk check if it is exist
    Risk.findOne({ title }).then((data) => {
      // if risk exists in DB, can't save to DB
      if (data !== null)
        res.status(400).json({
          message: {
            msgBody: "This Risk is already start taking control",
            msgErr: true,
          },
        });
      //   else save data to the collection
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
        //If there is no Risk with that title, save as a new Risk
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
          if (err)
            // if error occurs when saving to DB
            res.status(500).json({
              message: { msgBody: "Error has occured", msgErr: true },
            });
          else {
            // without errors new risk will be save to DB
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

  // Get a single risk info  
  getRisk: (req, res) => {
    Risk.findById(req.params.id)
      .then((risk, err) => {
        console.log(err);
        // if risk exists in DB, can't save to DB
        if (risk)
          res.status(201).json({
            message: {
              msgBody: "Risk successfully returned ",
              msgErr: false,
            },
            data: { risk },
          });
      })
      .catch((err) => {
        res
          .status(422)
          .json({ message: { msgBody: "Error has occured", msgErr: true } });
      });
  },

  // Change Risk Data  
  changeRisk: (req, res) => {
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
    // pass in parameter should be riskid
    const _id = req.params.id;
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
        res.status(200).json({
          message: {
            msgBody: "Risk successfully updated",
            msgErr: false,
          },
          data: { updatedRisk },
        });
      })
      .catch((err) =>
        res
          .status(422)
          .json({ message: { msgBody: "Error has occured", msgErr: true } })
      );
  },
};
