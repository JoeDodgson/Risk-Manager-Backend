const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        validate: [({ length }) => length <= 100, "Title should be within 100 characters."]
    }
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;