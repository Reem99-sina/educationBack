const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.signup = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    let existUser = await userModel.findOne({ email: email });
    if (existUser) {
      res.status(400).json({ message: "email exist" });
    } else {
      const user = new userModel({ userName, email, password, role });
      const saveUser = await user.save();
      res.status(201).json({ message: "done signup" });
    }
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};
module.exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).populate([
      {
        path: "exams",
      },
      { path: "courses" },
    ]);
    if (!user) {
      res.status(400).json({ message: "user not existed" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(400).json({ message: "password error" });
      } else {
        const token = await jwt.sign(
          { id: user._id, isLogged: true },
          process.env.JWT,
          { expiresIn: "24h" }
        );
        if (!token) {
          res.status(400).json({ message: "token error" });
        } else {
          // res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${60 * 60 * 24 * 1}; Path=/login`);
          res
            .cookie("access_token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ message: "Logged in successfully 😊 👌", user, token });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "error catch", error });
  }
};
module.exports.getTeacher = async (req, res) => {
  const findAllStudent = await userModel.find({ role: "teacher" });
  res.status(200).json({ message: "done", findAllStudent });
};
module.exports.getUserById = async (req, res) => {
   await userModel.findById(req?.params?.id).populate([
    {
      path: "exams",
    },
    { path: "courses" },
    { path: "preferCourses" },
  ]).then((data)=>res.status(200).json({ message: "done", user: data })).catch((error)=>res.status(400).json({ message: "error", error }))
};
// module.exports.sendEXamstoUser=async(req,res)=>{
//     const {exams,students}=req.body;
//     const findAllStudent=await userModel.find({})
// }
