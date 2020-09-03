const mongoose = require("mongoose");
const db = require("../db/index");
require('dotenv').config();

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/engineerdb"
);

const projectSeed = [
    {
        title:"title1",
        description:"discription1",
        location:["a", "b"],
        startDate:"01/09/2020",
        endDate:"30/08/2021",
        client:"client1",
        teamMembers:["member1", "member3", "member5"]        
    },
    {
        title:"title2",
        description:"discription2",
        location:["p", "q"],
        startDate:"01/10/2020",
        endDate:"30/09/2021",
        client:"client2",
        teamMembers:["member1", "member2", "member4"]         
    },
    {
        title:"title3",
        description:"discription3",
        location:["x", "y"],
        startDate:"01/09/2020",
        endDate:"30/08/2021",
        client:"client1",
        teamMembers:["member1", "member3", "member5"]        
    },
  
];

db.Project
  .remove({})
  .then(() => db.Project.collection.insertMany(projectSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
