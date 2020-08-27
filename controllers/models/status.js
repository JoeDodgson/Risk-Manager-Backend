const db = require("../../db/index");

function createStatus(body) {
    console.log("function run");
    console.log(body);
    db.Status.create(body)
        .then(db => {
            console.log("success\n");
            console.log(db);
            return db;
        })
        .catch(err => {
            console.log("failed to create status");
            return err;
        });
}

function deleteStatus(status) {
    db.Status.deleteOne({ status: status })
        .then(() => {
            console.log("\n Success \n")
            return
        })
        .catch(err => {
            console.log("failed");
            return err;
        });
};

module.exports = [createStatus, deleteStatus];