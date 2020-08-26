// File collect all routes and export in one folder
const auth = require ("./models/authorisation")
const disciplines = require ("./models/disciplines")
const project = require ("./models/project")
const risk = require ("./models/risk")
const status = require ("./models/status")
const user = require ("./models/user")


module.exports = {
    // Create
    createAuth: auth[0],
    createDiscipline: disciplines[0],
    createProject: project[0],
    createRisk: risk[0],
    createStatus: status[0],
    createUser: user[0],
    // Delete
    deleteAuth: auth[1],
    deleteDiscipline: disciplines[1],
    deleteProject: project[1],
    deleteStatus: status[1],
    // Get
    getRisk: risk[2],
    getUserData: user[2],
    // Change
    changeRisk: risk[1],
    changeUserData: user[1],
};

