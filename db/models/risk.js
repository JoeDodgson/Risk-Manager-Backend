const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RisksSchema = new Schema({
    title: {
        type: String,
        validate: [({ length }) => length <= 250, "Title should be less than 250 characters."]
    },
    riskId: {
        type: String,
        validate: [({ length }) => length <= 10, "riskId should be less than 10 characters."],
        required: true
    },
    description: {
        type: String,
        validate: [({ length }) => length <= 1000, "Description should be less than 1000 characters."]
    },
    designDiscipline: {
        type: String,
        ref: "Disciplines",
        validate: [({ length }) => length <= 50, "Description should be less than 50 characters."]
    },
    dateRaised: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Number,
        ref: "Status",
        min: 1,
        max: 3
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    comments: [{
        user: {
            name: { type: String },
            userId: { type: String }
        },
        content: { type: String },
        dateRaised: { 
            type: Date,
            default: Date.now()
        },
    }],
    likelihood: {
        type: Number,
        min: 1,
        max: 5
    },
    severity: {
        type: Number,
        min: 1,
        max: 5
    },
    risk: {
        type: Number,
        min: 2,
        max: 10
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
});

function arrayLimit(val) {
    return val.length <= 2;
}

const Risk = mongoose.model("Risk", RisksSchema);

module.exports = Risk;