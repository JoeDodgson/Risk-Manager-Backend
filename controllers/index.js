// File collect all routes and export in one folder
const {getAllProjects, getProject, createProject, deleteProject} = require ("./project");
const {createRisk, getRisk, changeRisk} = require ("./risk");
const {userRegister, userLogin, userLogout, authedUser, getUserData, updateUser} = require ("./user");

module.exports = {
    // user functionalities
    userRegister: userRegister,
    userLogin : userLogin,
    userLogout : userLogout,
    authedUser : authedUser,
    getUserData : getUserData,
    updateUser : updateUser,

    // project related functionalities
    getAllProjects : getAllProjects,
    getProject : getProject,
    createProject : createProject,
    deleteProject : deleteProject,
    
    // Risk related functionalities
    createRisk : createRisk,
    getRisk : getRisk,
    changeRisk : changeRisk

};

