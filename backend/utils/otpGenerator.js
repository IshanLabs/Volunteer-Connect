const crypto = require("crypto");

/**
 * Generate a secure numeric OTP of a given length
 * @param {number} length - Length of OTP (default 6)
 * @returns {string} OTP string
 */
const generateOTP = (length = 6) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += crypto.randomInt(0, 10).toString();
    }
    return otp;
};

module.exports = generateOTP;
