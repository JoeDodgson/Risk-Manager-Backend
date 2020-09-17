const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        validate: [({ length }) => length <= 100, "Title should be within 100 characters."]
    },
    description: {
        type: String,
        validate: [({ length }) => length <= 1000, "Title should be within 1000 characters."]
    },
    location: {
        lat: {
           type: Number
        },
        lng: {
           type: Number
        }
    },
    startDate: {
        type: Date,
        required: true 
    },
    endDate: {
        type: Date,
        required: true 
    },
    client: {
        type: String,
        required: true 
    },
    teamMembers: [{
        type: Array,
        required: true 
    }]
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;