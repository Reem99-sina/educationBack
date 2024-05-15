const mongoose = require("mongoose")

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
}, {
    timestamps: true
})


const courseModel = mongoose.model("course", courseSchema)
module.exports = courseModel