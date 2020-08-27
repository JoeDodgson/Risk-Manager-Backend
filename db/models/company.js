const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    company: {
        type: String,
        validate: [({ length }) => length <= 100, "Authorisation Status should be less than 100 characters."]
    }
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;