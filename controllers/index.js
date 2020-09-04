// File collect all routes and export in one folder
const {getAllProjects, getProject, createProject, deleteProject} = require ("./project");
const {createRisk, getRisk, changeRisk} = require ("./risk");
const {userRegister, userLogin, userLogout, authedUser, getUserData, updateUser} = require ("./user");

module.exports = {
    // user functionalities
    userRegister,
    userLogin,
    userLogout,
    authedUser ,
    getUserData,
    updateUser,

    // project related functionalities
    getAllProjects,
    getProject,
    createProject,
    deleteProject,
    
    // Risk related functionalities
    createRisk,
    getRisk,
    changeRisk

};

