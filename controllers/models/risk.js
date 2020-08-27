const db = require("../../db/index");

function createRisk(body) {
    console.log("function run");
    console.log(body);
    db.Risks.create(body)
        .then(db => {
            console.log("success\n");
            console.log(db);
            return db;
        })
        .catch(err => {
            console.log("failed to create risk");
            return err;
        });
}

// Get single user info
// CAUTION!!! Security issue (will send back password as well)
function getRisk(riskid) {
    db.Risks.find({ _id: riskid })
        .then(riskData => {
            console.log("\n Success \n -------DATA BELOW-------")
            console.log(riskData);
            return riskData;
        })
        .catch(err => {
            console.log("failed");
            return err;
        });
};

// Change User Data
// CAUTION NEED TO DISCUSS WHAT NEED TO CHANGE AND WHAT CANT
function changeRisk(body) {
    // pass in parameter should be userid
    const riskid = body.riskid;
    db.Risks.update({_id: riskid}, {$set: {
        title: body.title,
        description: body.description,
        designDiscipline: body.designDiscipline,
        //dateRaised: body.dateRaised,
        status: body.status,
        location: body.location,
        comments: body.comments,
        likelihood: body.likelihood,
        severity: body.severity,
        risk: body.risk
    }})
        .then(console.log("-------update success-------"))
        .catch(err => {
            console.log("---Update failed---");
            console.log(err);
        })
}

module.exports = [createRisk, changeRisk, getRisk];