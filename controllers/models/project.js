const db = require("../../db/index");

function createProject(body) {
    console.log("Creating...");
    console.log(body);
    db.Project.create(body)
        .then(db => {
            console.log("\nSuccessfully created\n");
            console.log(db);
            return db;
        })
        .catch(err => {
            console.log("\nFailed to create project\n");
            console.log(err);
            return err;
        });
};

function deleteProject(classname) {
    console.log("Deleting...");
    db.Authorisation.remove({ title: classname })
        .then(console.log("Successfully Deleted"))
        .catch(err => {
            console.log(err);
            return err;
        });
};

module.exports = [createProject, deleteProject];