const examModel = require("../models/exams");
const userModel = require("../models/user");

module.exports.postExams = async (req, res) => {
  try {
    const {  title,
        description,
        questions } = req.body;
    const exam = new examModel({  title,
        description,
        questions });
   const newExam= await exam.save()

   const allStudentSendExams=await userModel.updateMany({role:"student"},{ $push: { exams: newExam.id } })
    res.status(201).json({ message: "done add exams" });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
module.exports.getExams = async (req, res) => {
    try {
     const exams=await examModel.find()
      res.status(201).json({ exams });
    } catch (error) {
      res.status(500).json({ message: "error", error });
    }
  };
  