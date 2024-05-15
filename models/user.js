const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema({
    userName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "exam" }],
    courses:[{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    preferCourses:[{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    active:{type:Boolean,default:false},
    role:{type:String,default:"student", enum: ['student','teacher']}
}, {
    timestamps: true
})
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, Number(process.env.SALTNUMBER))
    next()
})

const userModel = mongoose.model("user", userSchema)
module.exports = userModel