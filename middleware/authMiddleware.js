const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTION") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "User not logged in" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "User not logged in" });
  }
};
