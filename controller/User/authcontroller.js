const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const generateToken = require('../../utils/generateToken');


exports.register = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ messge: 'User already exists' });
        const user = await User.create({ email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    
    const { email, password, role } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id, role);
        res.send({ success: true, message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

exports.getProfile = async (req, res) => {
    res.json({
        message: 'Welcome to your profile',
        user: req.user,
    });
};