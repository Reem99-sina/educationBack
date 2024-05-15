const { auth } = require("../middleware/auth")
const { validation } = require("../middleware/validation")
const { postCourse, getCourses, postPeferCourse } = require("../services/course.services")
const { coursesValidationAdd, coursesValidationById } = require("../validation/course.validation")



const router = require("express").Router()
router.get("/courses", auth(["student","teacher"]),getCourses)

router.post("/courses", auth(["teacher"]),validation(coursesValidationAdd),postCourse)
router.patch("/postPeferCourse/:id",auth(["student"]),postPeferCourse)
module.exports = router