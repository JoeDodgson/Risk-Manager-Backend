const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ message: "Authorization Denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ message: "Token Verification Failed, Authorization Denied" });
    res.user = verified.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
