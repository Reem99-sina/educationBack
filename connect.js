const mongoose = require("mongoose")
module.exports.connectdb = () => {
    return mongoose.connect(process.env.MONGODB).then(() => {
        console.log("done connect")
    }).catch((error) => {
        console.log("error connect", error)

    })
}