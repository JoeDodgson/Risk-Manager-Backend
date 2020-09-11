// Require in npm packages and local files
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const db = require("../db/index");

// Configure environment variables
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/engineerdb");

// Project seed data
const projectSeed = [
  {
    title: "London Eye",
    description: "Annual survey of structural and mechanical parts. General maintenance activities",
    location: {
       lat: 51.5033237,
       lng: -0.119543
    },
    startDate: "2021/01/02",
    endDate: "2021/01/30",
    client: "Merlin Entertainments Group",
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
    title: "London Bridge resurfacing",
    description: "Replacement of London Bridge road surfacing, due to significant deterioration",
    location: {
      lat: 51.505554,
      lng: -0.075278
    },
    startDate: "2021/12/25",
    endDate: "2020/12/27",
    client: "Transport for London",
    teamMembers: [
      {
        name: "Joe Dodgson",
        _id: "5f5a22646157b937082c422b"
      },
      {
        name: "Niro Witharana",
        _id: "5f5a22646157b937082c422f"
      },
      {
        name: "Meedaxa Ahmed",
        _id: "5f5a22646157b937082c422c"
      }
    ]
  },
  {
    title: "Rennovation and repairs of Elizabeth Tower",
    description: "Cleaning and repair of stonework. Removal of asbestos and toxic lead paint. Replacement of work parts",
    location: {
      lat: 51.5007289,
      lng: -0.1333587
    },
    startDate: "2017/08/21",
    endDate: "2023/01/01",
    client: "UK Government",
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

// Empties the projects collection and inserts data from projectSeed
db.Project.remove({})
  .then(() => db.Project.collection.insertMany(projectSeed))
  .then((data) => {
    console.log(data.result.n + "Project records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Error: scripts/seedsDB.js - seeding projects data - ${err}`);
    process.exit(1);
  });


// Risk seed data
const riskSeed = [   
  {
      title: "Workers falling",
      riskId: "LE001",
      description: "Risk of workers falling from height from the London Eye",
      designDiscipline: "Maintenance",
      status: 3,
      location: {
        lat: 51.502859,
        lng: -0.119732
      },
      comments: [
        {
          user: {
            name: "Ian Cheng",
            userId: "5f5a22646157b937082c422a"
          },
          content: "Workers will be secured to fixed structural components by harness, thereby reducing risk likelihood.",
          dateRaised: 1599835141000
        }
      ],
      likelihood:1,
      severity:4,
      risk:5,
      projectId: "5f59f053a94acd5aa0e4ebeb"         
  },
  {
      title: "London Eye collapse",
      riskId: "LE002",
      description: "Risk of collapse of the London Eye when replacing structural components",
      designDiscipline: "Structures",
      status: 2,
      location: {
        lat: 51.503173,
        lng: -0.118826
      },
      comments: [
        {
          user: {
            name: "Joe Dodgson",
            userId: "5f5a22646157b937082c422a"
          },
          content: "I think this risk can be mitigated by carrying out finite element analysis on the London Eye.",
          dateRaised: 1599815308000
        },
        {
          user: {
            name: "Ian Cheng",
            userId: "5f5a22646157b937082c422a"
          },
          content: "The Structures team will carry out structural assessment to ensure no collapse before any components are removed. Risk transferred to Design Structures team.",
          dateRaised: 1599838228000
        }
      ],
      likelihood:2,
      severity:5,
      risk:7,
      projectId: "5f59f053a94acd5aa0e4ebeb"         
  },
  {
      title: "Items dropped from height",
      riskId: "LE003",
      description: "Risk of item workers on the London Eye dropping items from height and striking somebody below",
      designDiscipline: "Maintenance",
      status: 1,
      location: {
        lat: 51.503323,
        lng: -0.119357
      },
      comments: [
        {
          user: {
            name: "Joe Dodgson",
            userId: "5f5a22646157b937082c422a"
          },
          content: "Could all repair work be carried out using cherry pickers?",
          dateRaised: 1599731744000
        }
      ],
      likelihood:5,
      severity:4,
      risk:9,
      projectId: "5f59f053a94acd5aa0e4ebeb"         
  },
  {
      title: "Slips, trips and falls",
      riskId: "LB001",
      description: "Slips, trips and falls caused by uneven surfacing during repair",
      designDiscipline: "Maintenance",
      status: 1,
      location: {
        lat: 51.505554,
        lng: -0.075278
      },
      comments: [
        {
          user: {
            name: "Joe Dodgson",
            userId: "5f5a22646157b937082c422b"
          },
          content: "Notice signs should be placed around the site so that workers know where uneven surfaces will be.",
          dateRaised: 1596978928000
        },
        {
          user: {
            name: "Meedaxa Ahmed",
            userId: "5f5a22646157b937082c422c"
          },
          content: "Walkways should also be set up so that people don't walk on uneven surfaces.",
          dateRaised: 1597916435000
        }
      ],
      likelihood:5,
      severity:2,
      risk:7,
      projectId:"5f59f053a94acd5aa0e4ebec"         
  },
  {
      title: "Big Ben bell deafening workers",
      riskId: "ET001",
      description: "Risk of workers in the tower being deafened by Big Ben ringing",
      designDiscipline: "designDiscipline3",
      status: 1,
      location: {
        lat: 51.510357,
        lng: -0.116773
      },
      comments: [
        {
          user: {
            name: "Meedaxa Ahmed",
            userId: "5f5a22646157b937082c422c"
          },
          content: "We could stop the bell from ringing during the duration of works, but I don't think this would be acceptable for the client.",
          dateRaised: 1504971028000
        }
      ],
      likelihood:5,
      severity:3,
      risk:8,
      projectId:"5f59f053a94acd5aa0e4ebed"
  },
];

// Empties the risks collection and inserts data from riskSeed
db.Risk
  .remove({})
  .then(() => db.Risk.collection.insertMany(riskSeed))
  .then(data => {
    console.log(data.result.n + "Risk records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(`Error: scripts/seedsDB.js - seeding risks data - ${err}`);
    process.exit(1);
  });
