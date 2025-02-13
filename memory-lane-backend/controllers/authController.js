const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        console.log('Registration attempt:', { name, email });

        if (mongoose.connection.readyState !== 1) {
            console.error('Database connection state:', mongoose.connection.readyState);
            throw new Error('Database not connected');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                error: "Email already registered" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword,
            emailPreferences: {
                receiveEmails: true,
                emailFrequency: 'daily'
            }
        });

        const token = jwt.sign(
            { userId: newUser._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        console.log('User created successfully:', newUser._id);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Registration error details:', {
            message: error.message,
            stack: error.stack,
            mongoState: mongoose.connection.readyState
        });
        res.status(500).json({ 
            success: false,
            error: error.message || "Registration failed. Please try again."
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        console.log('Login attempt:', { email });

        if (mongoose.connection.readyState !== 1) {
            console.error('Database connection state:', mongoose.connection.readyState);
            throw new Error('Database not connected');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                error: "User not found" 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                error: "Invalid credentials" 
            });
        }

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        console.log('User logged in successfully:', user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error details:', {
            message: error.message,
            stack: error.stack,
            mongoState: mongoose.connection.readyState
        });
        res.status(500).json({ 
            success: false,
            error: error.message || "Login failed. Please try again."
        });
    }
};

module.exports = { registerUser, loginUser };
