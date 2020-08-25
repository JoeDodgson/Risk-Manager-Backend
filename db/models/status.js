const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StatusSchema = new Schema({
    status: {
        type: String,
        validate: [({ length }) => length <= 50, "Status should be less than 50 characters."]
    }
});

const Status = mongoose.model("Status", StatusSchema);

module.exports = Status;