const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const employeeRoutes = require("./routes/employeeRoutes")

const DB_CONNECTION_STRING = 
    process.env.DB_CONNECTION_STRING || "mongodb://mongo:27017/employees_db";

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error: ", error)
})

const app = express()

const SERVER_PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/user", userRoutes)
app.use("/api/v1/emp", employeeRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
