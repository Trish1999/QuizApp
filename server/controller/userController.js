const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt =require ("jsonwebtoken")

const registerUser=async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if (!name || !email || !password ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res
                .status(409)
                .json({ errorMessage: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name,
            email,
            password: hashedPassword
        });

        await userData.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.json({ errorMessage: "something went wrong" });
    }
};
        
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Bad Request! Invalid credentials",
            });
        }

        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ errorMessage: "Wrong password please check" });
        }

        const token = jwt.sign({
            userId: userDetails._id,
            email: userDetails.email
        }, process.env.SECRET_KEY, { expiresIn: "24h" });
        res.json({ message: "User logged in" ,token:token,email:userDetails.email,userId:userDetails._id});
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMessage: "Something went wrong!" });
    }
};


module.exports = { registerUser ,loginUser};