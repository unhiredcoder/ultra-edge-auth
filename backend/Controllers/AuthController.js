const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { fullname, email, mobile, password } = req.body;
        console.log("🚀 ~ signup ~ req.body:", req.body)

        // Check if all required fields are provided
        if (!fullname || !email || !mobile || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists, please login', success: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            fullname,
            email,
            mobile,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'Signup successful', success: true });

    } catch (err) {
        if (err.code === 11000 && err.keyPattern?.mobile) {
            return res.status(400).json({ message: 'Mobile number is already used.' });
        }
        if (err.keyPattern?.email) {
            return res.status(400).json({ message: 'Email is already used.' });
        }
        console.error("Signup Error:", err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        const errorMsg = 'wrong credentials';

        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email: user.email,
            fullname: user.fullname, 
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
module.exports = {
    signup,
    login
}