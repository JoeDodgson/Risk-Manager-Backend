const db = require("../../db/index");

function createAuth(body) {
    console.log("Creating Auth...");
    console.log(body);
    db.Authorisation.create(body)
        .then(dbAuth => {
            console.log("\nSuccessfully created new auth class\n");
            console.log(dbAuth);
            return dbAuth;
        })
        .catch(err => {
            console.log("\nFailed to create new auth class\n");
            return err;
        });
};

function deleteAuth(authorisationStatus) {
    console.log("Deleting Auth Class...");
    // ES6 Destructuring (if the key and value is the same just need to input once)
    db.Authorisation.remove({ authorisationStatus })
        .then(console.log("Successfully Deleted"))
        .catch(err => {
            console.log("failed deleting auth")
            console.log(err);
            return err;
        });
};

module.exports = [createAuth, deleteAuth];