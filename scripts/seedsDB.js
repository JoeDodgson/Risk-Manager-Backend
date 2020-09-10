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
      lat: 51.5033237,
      lng: -0.1282763
    },
    startDate: "2021/06/02",
    endDate: "2023/04/19",
    client: "British Government",
    teamMembers: [
      {
        name: "Ian Cheng",
        _id: "5f5a22646157b937082c422a"
      },
      {
        name: "Joe Dodgson",
        _id: "5f5a22646157b937082c422b"
      },
      {
        name: "Meedaxa Ahmed",
        _id: "5f5a22646157b937082c422c"
      }
    ]
  },
  {
    title: "London Bridge",
    description: "Road repair",
    location: {
      lat: 51.5078788,
      lng: -0.0964868
    },
    startDate: "2021/02/05",
    endDate: "2020/12/18",
    client: "British Government",
    teamMembers: [
      {
        name: "Joe Dodgson",
        _id: "5f5a22646157b937082c422b"
      },
      {
        name: "Niro Witharana",
        _id: "5f5a22646157b937082c422d"
      },
      {
        name: "Meedaxa Ahmed",
        _id: "5f5a22646157b937082c422c"
      }
    ]
  },
  {
    title: "Big Ben",
    description: "Renew",
    location: {
      lat: 51.5007289,
      lng: -0.1333587
    },
    startDate: "2020/12/12",
    endDate: "2021/02/09",
    client: "British Government",
    teamMembers: [
      {
        name: "Joe Dodgson",
        _id: "5f5a22646157b937082c422b"
      },
      {
        name: "Meedaxa Ahmed",
        _id: "5f5a22646157b937082c422c"
      },
      {
        name: "Ian Cheng",
        _id: "5f5a22646157b937082c422a"
      }
    ]
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
          lat: 51.5033237,
          lng: -0.1282763
        },
        comments: [
          {
            user: {
              name: "Ian Cheng",
              userId: "5f5a22646157b937082c422a"
            },
            content: "Floor slippy aware",
            dateRaised: Date.now()
          }
        ],
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
          lat: 51.5078788,
          lng: -0.0964868
        },
        comments: [
          {
            user: {
              name: "Joe Dodgson",
              userId: "5f5a22646157b937082c422b"
            },
            content: "More Notice Sign Should Be Placed Around The Site",
            dateRaised: Date.now()
          }
        ],
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
          lat: 51.5007289,
          lng: -0.1333587
        },
        comments: [
          {
            user: {
              name: "Meedaxa Ahmed",
              userId: "5f5a22646157b937082c422c"
            },
            content: "Scarfold Aware",
            dateRaised: Date.now()
          }
        ],
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
