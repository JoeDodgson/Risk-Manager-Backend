require('dotenv').config();
const JWT = require("jsonwebtoken");

// userID is primary key
const signToken = (userID) => {
  // will return actual JWT token
  // we can send any data inside payload but not info like credict cards
  return JWT.sign(
    {
      // who issue this JWT token
      iss: process.env.JWT_ISSUE,
      // who is this token for
      sub: userID,
      // this risk manager must be same as secretOrKey
    },
    process.env.SECRET_OR_KEY,
    { expiresIn: '5hr' }
  );
};

module.exports = signToken