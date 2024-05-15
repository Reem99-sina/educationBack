const { auth } = require("../middleware/auth")
const { validation } = require("../middleware/validation")
const { getExams, postExams } = require("../services/exams.services")

const { examsValidationAdd } = require("../validation/exam.validation")


const router = require("express").Router()
router.get("/exams", auth(["student","teacher"]),getExams)

router.post("/exams", auth(["teacher"]),validation(examsValidationAdd), postExams)

module.exports = router