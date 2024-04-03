const getError = require('../utils/dbErrorHandler')
const User = require("../models/User")

module.exports = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body
            const user = User({
                name, email, password
            })
            await user.save();
            res.status(201).json({
                message: "Registerd successfully"
            })
        } catch (error) {
            res.status(400).json({
                message: getError(error)
            })
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                res.status(401).json({
                    message: "Invalid email or password"
                })
            }
            const token = user.generateAuthToken()
            const expiryDate = new Date(Date.now() +  (30 * 24 * 60 * 60 * 1000));
            res.cookie('jwt', token, { httpOnly: true, expires: expiryDate})
            res.status(200).json({
                token
            })
        } catch (error) {
            res.status(401).json({
                message: error.message === "Invalid email or password" ? error.message : getError(error)
            })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("jwt")
            res.status(200).json({
                message: "Logged out successfully"
            })
        } catch (error) {
            res.status(400).json({
                message: "Something went wrong"
            })
        }
    }
}