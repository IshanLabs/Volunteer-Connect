const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

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

        const existingUser =
            await userModel.findUserByEmail(email);

        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });

        }

        const passwordHash =
            await bcrypt.hash(password, 10);

        const newUser =
            await userModel.createUser({

                fullName,
                email,
                passwordHash,
                role

            });

        return res.status(201).json({

            success: true,
            message: "Account created successfully",
            user: newUser

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};

module.exports = {
    signup,
};