// Require in all routes and export in one object
const { createUser, userLogin, userLogout, authedUser, getUser, updateUser } = require ("./user");
const { getAllProjects, getProject, createProject, deleteProject } = require ("./project");
const { createRisk, getRisk, getRisksByProjectId, changeRisk, deleteRisk } = require ("./risk");

module.exports = {
    // User CRUD operations
    createUser,
    userLogin,
    userLogout,
    authedUser ,
    getUser,
    updateUser,

    // Project CRUD operations
    getAllProjects,
    getProject,
    createProject,
    deleteProject,
    
    // Risk CRUD operations
    createRisk,
    getRisk,
    getRisksByProjectId,
    changeRisk,
    deleteRisk,

};

