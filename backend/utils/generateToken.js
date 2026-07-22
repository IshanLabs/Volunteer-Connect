const jwt = require("jsonwebtoken");

/**
 * Generates a signed JWT token containing user info.
 * @param {string|number} userId - The user's database ID.
 * @param {string} role - The user's role.
 * @returns {string} The signed JWT.
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || "fallback_secret_key",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    }
  );
};

module.exports = generateToken;
