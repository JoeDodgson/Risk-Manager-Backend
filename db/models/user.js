const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
         match: [/.+@.+\..+/, "Please enter a valid email"]
    },
    firstName: {
        type: String,
        trim: true,
        required: "First Name is Required"
    },
    lastName: {
        type: String,
        trim: true,
        required: "Last Name is Required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
    },
    project: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    company: {
        type: String,
        validate: [({ length }) => length <= 100, "Authorisation Status should be less than 100 characters."]
    }
});


const User = mongoose.model("User", UserSchema);

module.exports = User;