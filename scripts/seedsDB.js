const mongoose = require("mongoose");
const db = require("../db/index");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/engineerdb");

// This file empties the projects collection and inserts the books below
const projectSeed = [
  {
    title: "title1",
    description: "discription1",
    location: {
      lat: -1.5,
      lng: 51.151651,
    },
    startDate: "01/09/2020",
    endDate: "30/08/2021",
    client: "client1",
    teamMembers: ["member1", "member3", "member5"],
  },
  {
    title: "title2",
    description: "discription2",
    location: {
      lat: -1.4,
      lng: 48.151651,
    },
    startDate: "01/10/2020",
    endDate: "30/09/2021",
    client: "client2",
    teamMembers: ["member1", "member2", "member4"],
  },
  {
    title: "title3",
    description: "discription3",
    location: {
      lat: -1.35,
      lng: 46.251651,
    },
    startDate: "01/09/2020",
    endDate: "30/08/2021",
    client: "client1",
    teamMembers: ["member1", "member3", "member5"],
  },
];

db.Project.remove({})
  .then(() => db.Project.collection.insertMany(projectSeed))
  .then((data) => {
    console.log(data.result.n + "Project records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

  // This file empties the risks collection and inserts the books below
  const riskSeed = [   
    {
        title: "title1",
        riskId: "riskId1",
        description:"discription1",
        designDiscipline: "designDiscipline1",
        status: 2,
        location: {
            lat: -1.5,
            lng: 51.151651,
          },
        likelihood:3,
        severity:4,
        risk:15,
        projectId:"5f4eec89cc853f32ec03243e"         
    },
    {
        title: "title2",
        riskId: "riskId2",
        description:"discription2",
        designDiscipline: "designDiscipline2",
        status: 2,
        location: {
            lat: -1.5,
            lng: 51.151651,
          },
        likelihood:3,
        severity:4,
        risk:15,
        projectId:"5f4eec89cc853f32ec03243e"         
    },
    {
        title: "title3",
        riskId: "riskId3",
        description:"discription3",
        designDiscipline: "designDiscipline3",
        status: 2,
        location: {
            lat: -1.5,
            lng: 51.151651,
          },
        likelihood:3,
        severity:4,
        risk:15,
        projectId:"5f4eec89cc853f32ec03243e"
    },
  
];

db.Risk
  .remove({})
  .then(() => db.Risk.collection.insertMany(riskSeed))
  .then(data => {
    console.log(data.result.n + "Risk records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
