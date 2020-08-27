const db = require("../../db/index");

function createDiscipline(body) {
    console.log("Creating Discipline...");
    console.log(body);
    db.Disciplines.create(body)
        .then(dbDiscipline => {
            console.log("\nSuccessfully created new Discipline\n");
            console.log(dbDiscipline);
            return dbDiscipline;
        })
        .catch(err => {
            console.log("\nFailed to create new Discipline\n");
            return err;
        });
}

function deleteDiscipline(classname) {
    console.log("Deleting Discipline...");
    db.Disciplines.remove({ title: classname })
        .then(console.log("Successfully Deleted"))
        .catch(err => {
            console.log(err);
            return err;
        });
};

module.exports = [createDiscipline, deleteDiscipline];