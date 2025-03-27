const jwt = require("jsonwebtoken");

const secretKey = "bhushan45";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.status(401).json({ message: "Unauthorize user" });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = authMiddleware;
