const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

module.exports.roles =
{
    admin: "admin",
    user: "student"
}

module.exports.auth = (accessRole) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization']
            if (!headerToken.startsWith(`${process.env.BEARER} `)) {
                res.status(400).json({ message: "in valid header token", authorization:req.headers['authorization']})
            } else {
                const token = headerToken.split(" ")[1]
                if (!token) {
                    res.status(400).json({ message: "no token there" })
                } else {
                    const decoded = jwt.verify(token, process.env.JWT)
                    if (!decoded) {
                        res.status(400).json({ message: "in valid token" })
                    } else {
                        const user = await userModel.findById(decoded.id)
                        if (!user) {
                            res.status(400).json({ message: "no user fonud" })
                        } else {
                            if (accessRole.includes(user.role)) {
                                req.user = user
                                next()
                            } else {
                                res.status(400).json({ message: "no role user" })
                            }
                        }
                    }
                }
            }
        } catch (error) {
            res.status(400).json({ message: "error catch", error })
        }
    }
}