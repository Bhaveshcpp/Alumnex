const jwt = require("jsonwebtoken");

const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;
