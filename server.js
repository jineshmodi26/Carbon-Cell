const express = require("express");
const { default: mongoose } = require("mongoose");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/user.router")
const dataRouter = require("./routes/data.router")
const {serve, setup} = require("./swagger")

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api-docs', serve, setup)
app.use("/api/users/v1", userRouter)
app.use("/api/data/v1", dataRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)   
})