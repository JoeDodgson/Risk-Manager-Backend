// File collect all schema and export in one folder

module.exports = {
    Risks: require("./models/risk"),
    Disciplines: require("./models/disciplines"),
    Status: require("./models/status"),
    User: require("./models/user"),
    Authorisation: require("./models/authorisation"),
    Project: require("./models/project")
};