const courseModel = require("../models/course");
const userModel = require("../models/user");

module.exports.postCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new courseModel({ title, description });
    const newCourses = await course.save();
    const allStudentSendCourses = await userModel.updateMany(
      { role: "student" },
      { $push: { courses: newCourses.id } }
    );

    res.status(201).json({ message: "done add course" });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
module.exports.getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(201).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
module.exports.postPeferCourse = async (req, res) => {
  try {
    const { id } = req?.params;
    console.log(id, "id");
    const course = await courseModel.findById(id);
    await userModel
      .findById(req?.user?.id)
      .populate("preferCourses")
      .then(async (resultApp) => {
        const arrayPrefer = resultApp?.preferCourses?.map((ele) => ele?.id);
        if (arrayPrefer?.includes(course?.id) == false) {
          await userModel.findByIdAndUpdate(req.user.id, {
            preferCourses: [...arrayPrefer, course?.id],
          } ,{new: true}).then((ele)=>res.status(201).json({ message: "update prefer courses", user:ele })).catch((error)=>res.status(401).json({ message: "error" }))
          
        } else {
          await userModel
            .findByIdAndUpdate(
              req.user.id ,
              { preferCourses: arrayPrefer?.filter((ele) => ele != course?.id) },
              {new: true}
            )
            .then((ele) => {
              console.log(ele, "ele");
              res.status(201).json({ message: "update prefer courses",user:ele });
            })
            .catch((error) => {
              res.status(401).json({ message: "error" });
            });
        }
      })
      .catch((error) => res.status(500).json({ message: "no user", error }));
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
