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
      lat: 52.505333,
      lng: -1.923352,
    },
    startDate: "2021/06/02",
    endDate: "2023/04/19",
    client: "client1",
    teamMembers: ["member1", "member3", "member5"],
  },
  {
    title: "title2",
    description: "discription2",
    location: {
      lat: 52.506752,
      lng: -1.927523,
    },
    startDate: "2021/02/05",
    endDate: "2020/12/18",
    client: "client2",
    teamMembers: ["member1", "member2", "member4"],
  },
  {
    title: "title3",
    description: "discription3",
    location: {
      lat: 52.509752,
      lng: -1.923867,
    },
    startDate: "2020/12/12",
    endDate: "2021/02/09",
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
    console.error(`Error: controllers/Project.js - authedUser() - ${err}`);
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
            lat: 52.505641,
            lng: -1.923124,
          },
        likelihood:4,
        severity:4,
        risk:8,
        projectId:"5f4eec89cc853f32ec03243e"         
    },
    {
        title: "title2",
        riskId: "riskId2",
        description:"discription2",
        designDiscipline: "designDiscipline2",
        status: 2,
        location: {
            lat: 52.558125,
            lng: -1.821516,
          },
        likelihood:3,
        severity:4,
        risk:7,
        projectId:"5f4eec89cc853f32ec03243e"         
    },
    {
        title: "title3",
        riskId: "riskId3",
        description:"discription3",
        designDiscipline: "designDiscipline3",
        status: 2,
        location: {
            lat: 52.652311,
            lng: -1.126321,
          },
        likelihood:3,
        severity:4,
        risk:7,
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
    console.error(`Error: controllers/risk.js - authedUser() - ${err}`);
    process.exit(1);
  });
