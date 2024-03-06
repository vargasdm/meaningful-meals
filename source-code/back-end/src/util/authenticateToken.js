require("dotenv").config();
const jwt = require("jsonwebtoken");
const { logger } = require("../util/logger");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      logger.error(err);
      return res.status(403).json({ message: "Forbiden Access" });
    }
    req.user = user;
    next();
  });
};

const authenticateNoToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  next();
};

module.exports = { authenticateToken, authenticateNoToken };
