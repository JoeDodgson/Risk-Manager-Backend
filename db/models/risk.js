const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RisksSchema = new Schema({
    title: {
        type: String,
        validate: [({ length }) => length <= 250, "Title should be less than 250 characters."]
    },
    description: {
        type: String,
        validate: [({ length }) => length <= 1000, "Description should be less than 1000 characters."]
    },
    designDiscipline: {
        type: Schema.Types.ObjectId,
        ref: "Disciplines"
    },
    dateRaised: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: "Status"
    },
    location: {
        type: Array,
        validate: [arrayLimit, '{PATH} exceeds the limit of 2']
    },
    comments: {
        type: Array
    },
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
        min: 1,
        max: 25
    }
});

function arrayLimit(val) {
    return val.length <= 2;
}

const Risks = mongoose.model("Risks", RisksSchema);

module.exports = Risks;