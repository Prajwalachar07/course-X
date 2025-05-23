// const jwt = require("jsonwebtoken");
// const { JWT_USER_PASSWORD } = require("../config");

// const userMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(403).json({ message: "No token provided" });
//   try {
//     const decoded = jwt.verify(token, JWT_USER_PASSWORD);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Invalid token" });
//   }
// };

// module.exports = { userMiddleware };

const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

const userMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { userMiddleware };
