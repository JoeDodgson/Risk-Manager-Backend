const db = require("../../db/index");

//------------- USER -------------

// Add User
function createUser(body) {
    console.log("function run");
    console.log(body);
    db.User.create(body)
        .then(dbUser => {
            console.log("success \n");
            console.log(dbUser);
            return dbUser;
        })
        .catch(err => {
            console.log("failed to create user");
            console.log(err);
            return err;
        });
}

// Get single user info
// CAUTION!!! Security issue (will send back password as well)
function getUserData(userid) {
    db.User.find({ _id: userid })
        .then(userData => {
            console.log("\n Success \n -------DATA BELOW-------")
            console.log(userData);
            return userData;
        })
        .catch(err => {
            console.log("failed");
            return err;
        });
};

// Change User Data
// CAUTION NEED TO DISCUSS WHAT NEED TO CHANGE AND WHAT CANT
function changeUserData(body) {
    // pass in parameter should be userid
    const userid = body.userid;
    db.User.update({_id: userid}, {$set: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
        designDiscipline: body.designDiscipline,
        authorisation: body.authorisation,
        project: body.project
    }})
        .then(console.log("-------update success-------"))
        .catch(err => {
            console.log("---Update failed---");
            console.log(err);
        })
}

// ------------- USER END -------------

module.exports = [createUser, changeUserData, getUserData];