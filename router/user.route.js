
const { auth } = require("../middleware/auth")
const { validation } = require("../middleware/validation")
const { signup, signin, getTeacher, getUserById } = require("../services/user.services")
const { signupvalidation, signinvalidation } = require("../validation/user.validation")

const router = require("express").Router()
router.post("/register", validation(signupvalidation), signup)
router.post("/login", validation(signinvalidation), signin)
router.get("/getAllTeacher",getTeacher)
router.get("/:id",auth(["student"]),getUserById)
// router.post("/addExamstoUser",auth(["admin"],))
module.exports = router