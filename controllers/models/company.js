const db = require("../../db/index");

function createCompany(body) {
    console.log("Creating Company...");
    console.log(body);
    db.Company.create(body)
        .then(dbCompany => {
            console.log("\nSuccessfully created new auth class\n");
            console.log(dbCompany);
            return dbCompany;
        })
        .catch(err => {
            console.log("\nFailed to create new auth class\n");
            return err;
        });
};

function deleteCompany(companyName) {
    console.log("Deleting Auth Class...");
    // ES6 Destructuring (if the key and value is the same just need to input once)
    db.Company.remove({ company: companyName })
        .then(console.log("Successfully Deleted"))
        .catch(err => {
            console.log("failed deleting company")
            console.log(err);
            return err;
        });
};

module.exports = [createCompany, deleteCompany];