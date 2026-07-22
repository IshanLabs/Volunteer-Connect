const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { sendWelcomeEmail, sendOTPEmail } = require("../utils/sendEmail");
const generateOTP = require("../utils/otpGenerator");

// Temporary in-memory store for OTPs (or store in Redis/DB for production)
const otpStore = new Map();

const signup = async (req, res) => {
    console.log("➡️ Signup API called");

    try {
        const { fullName, email, password, role } = req.body;

        console.log(req.body);

        if (!fullName || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = await userModel.createUser({
            fullName,
            email,
            passwordHash,
            role
        });

        // Generate token for auto-login after signup
        const token = generateToken(newUser.user_id, newUser.role);

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
            user: {
                userId: newUser.user_id,
                fullName: newUser.full_name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("❌ Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Send OTP to User Email via Brevo
 */
const sendOTP = async (req, res) => {
    console.log("➡️ Send OTP API called");

    try {
        const { email, name } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email address is required"
            });
        }

        const otp = generateOTP(6);
        otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

        const emailResult = await sendOTPEmail(email, otp, name);

        if (emailResult.success) {
            return res.status(200).json({
                success: true,
                message: "OTP sent successfully to email"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to send OTP email",
                error: emailResult.error
            });
        }
    } catch (error) {
        console.error("❌ Send OTP error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Verify OTP entered by user
 */
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const storedData = otpStore.get(email);

        if (!storedData) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired. Please request a new code."
            });
        }

        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new code."
            });
        }

        if (storedData.otp !== otp.toString().trim()) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP code."
            });
        }

        // OTP is valid
        otpStore.delete(email);

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });
    } catch (error) {
        console.error("❌ Verify OTP error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const login = async (req, res) => {
    console.log("➡️ Login API called");

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user.user_id, user.role);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                userId: user.user_id,
                fullName: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("❌ Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    signup,
    login,
    sendOTP,
    verifyOTP,
};