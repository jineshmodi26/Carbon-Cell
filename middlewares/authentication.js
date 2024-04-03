const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id: decoded._id })
        if (!user) {
            res.status(401).json({
                message: "Authorization required"
            })
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(400).json({
            message: "Authorization required"
        })
    }
}

module.exports = auth