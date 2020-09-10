// Require in all routes and export in one object
const { createUser, userLogin, userLogout, authedUser, getUser, updateUser, getAllUser } = require ("./user");
const { getAllProjects, getProject, createProject, deleteProject, getProjectByUserId } = require ("./project");
const { createRisk, getRisk, getRisksByProjectId, changeRisk, deleteRisk, getRisksByUserId, createComment } = require ("./risk");

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
    getAllUser,
    getProjectByUserId,
    
    // Risk CRUD operations
    createRisk,
    getRisk,
    getRisksByProjectId,
    getRisksByUserId,
    changeRisk,
    deleteRisk,
    createComment,
};

