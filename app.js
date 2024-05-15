const express = require('express')
const cookieParser = require('cookie-parser');

const cors = require("cors")
const app = express()
const path = require("path")
const { connectdb } = require('./connect')
const { userRouter, examsRouter, courseRouter } = require('./router/mainroute')

require("dotenv").config()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1/user", userRouter)
app.use("/api/v1/exams", examsRouter)
app.use("/api/v1/course", courseRouter)

connectdb()

app.listen(process.env.PORT, () => {
    console.log(`server is runnin on port :::: `);
})