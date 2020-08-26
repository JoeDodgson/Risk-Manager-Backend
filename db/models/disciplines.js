const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DisciplinesSchema = new Schema({
    title: {
        type: String,
        validate: [({ length }) => length <= 50, "Title should be less than 50 characters."]
    }
});

const Disciplines = mongoose.model("Disciplines", DisciplinesSchema);

module.exports = Disciplines;