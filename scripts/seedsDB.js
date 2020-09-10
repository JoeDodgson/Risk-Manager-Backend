const mongoose = require("mongoose");
const db = require("../db/index");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/engineerdb");

// This file empties the projects collection and inserts the books below
const projectSeed = [
  {
    title: "London Eye",
    description: "Annual maintenance",
    location: {
      lat: 50.353626,
      lng: 1.6235,
    },
    startDate: "2021/06/02",
    endDate: "2023/04/19",
    client: "British Government",
    teamMembers: ["Joe", "ian", "dan"],
  },
  {
    title: "London Bridge",
    description: "Road repair",
    location: {
      lat: 48.6345,
      lng: -1.927523,
    },
    startDate: "2021/02/05",
    endDate: "2020/12/18",
    client: "British Government",
    teamMembers: ["Ben", "Mary", "Sarah"],
  },
  {
    title: "Big Ben",
    description: "Renew",
    location: {
      lat: 47.4266,
      lng: -1.463867,
    },
    startDate: "2020/12/12",
    endDate: "2021/02/09",
    client: "British Government",
    teamMembers: ["Kenny", "Queenie", "David"],
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
        title: "London Eye",
        riskId: "riskId1",
        description: "Annual maintenance",
        designDiscipline: "designDiscipline1",
        status: 2,
        location: {
            lat: 50.353626,
            lng: 1.6235,
          },
        likelihood:4,
        severity:4,
        risk:8,
        projectId: "5f59f053a94acd5aa0e4ebeb"         
    },
    {
        title: "London Bridge",
        riskId: "riskId2",
        description: "Road repair",
        designDiscipline: "designDiscipline2",
        status: 2,
        location: {
            lat: 48.6345,
            lng: -1.927523,
          },
        likelihood:3,
        severity:4,
        risk:7,
        projectId:"5f59f053a94acd5aa0e4ebec"         
    },
    {
        title: "Big Ben",
        riskId: "riskId3",
        description: "Renew",
        designDiscipline: "designDiscipline3",
        status: 2,
        location: {
            lat: 47.4266,
            lng: -1.463867,
          },
        likelihood:3,
        severity:4,
        risk:7,
        projectId:"5f59f053a94acd5aa0e4ebed"
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
