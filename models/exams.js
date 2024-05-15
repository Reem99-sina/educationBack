const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userModel = require("./user")
const examSchema = mongoose.Schema({
    title: {type:String,unique:true},
    description: String,
    questions: [{ question: String,answer:String }],

}, {
    timestamps: true
})


const examModel = mongoose.model("exam", examSchema)
module.exports = examModel