const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({
        isAuthenticated: false,
        message: {
          msgBody: "Authorization Failed",
          msgErr: true,
        },
      });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.status(401).json({
        isAuthenticated: false,
        message: {
          msgBody: "Token Verification Failed, Access Denied",
          msgErr: true,
        },
      });
    res.user = verified.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = auth;