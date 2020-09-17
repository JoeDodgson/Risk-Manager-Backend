const router = require("express").Router();
const userRouter = require("./api/user");
const projectRouter = require("./api/projects");

router.use("/user", userRouter);
router.use("/project", projectRouter);

module.exports = router;