const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorisationSchema = new Schema({
    authorisationStatus: {
        type: String,
        validate: [({ length }) => length <= 20, "Authorisation Status should be less than 20 characters."]
    }
});

const Authorisation = mongoose.model("Authorisation", AuthorisationSchema);

module.exports = Authorisation;