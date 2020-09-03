const { Project } = require("../db/index");

module.exports = {
getAllProjects : (req, res) => {
  Project.find(req.body)
    .sort({ date: -1 })
    .then((dbModel) =>
      res.status(200).json({
        message: {
          msgBody: "All The approved Engineering Projects",
          msgErr: false,
        },
        data: { dbModel },
      })
    )
    .catch((err) =>
      res
        .status(422)
        .json({ message: { msgBody: "Error has occured", msgErr: true } })
    );
},

createProject : (req, res) => {
  const title = req.body.title;
  //  before create a new project check if it is exist
  Project.findOne({ title }).then((data) => {
    // if project exists in DB, can't save to DB
    if (data !== null)
      res.status(400).json({
        message: {
          msgBody: "This Project is already taken",
          msgErr: true,
        },
      });
    //   else save data to the collection
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
      //If there is no project with that title, save as a new project
      const newProject = new Project({
        title,
        description,
        location,
        startDate,
        endDate,
        client,
        teamMembers,
      });
      newProject.save((err, newPro) => {
        if (err)
          // if error occurs when saving to DB
          res
            .status(500)
            .json({ message: { msgBody: "Error has occured", msgErr: true } });
        else {
          // without errors Project saved to DB
          res.status(201).json({
            message: {
              msgBody: "Project successfully created",
              msgErr: false,
            },
            data: { newPro },
          });
        }
      });
    }
  });
},

// deleting a project by it's id
deleteProject :(req, res) => {
  //   checking if it's exist
  Project.findById(req.params.id)
    //   then remove it using remove method
    .then((data) => data.remove())
    .then((projectData) => {
      res.status(201).json({
        message: {
          msgBody: "Project successfully Deleted",
          msgErr: false,
        },
        data: { projectData },
      });
    })

    .catch((err) =>
      res
        .status(422)
        .json({ message: { msgBody: "Error has occured", msgErr: true } })
    );
}
}
