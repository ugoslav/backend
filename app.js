require("dotenv").config()
require("express-async-errors")
const config = require("./utils/config")
const express = require("express");
const app = express()
const cors = require("cors");
const notesRouter = require("./controllers/notes")
const middleware = require("./utils/middleware")
const { info, error } = require("./utils/logger")

//Connection to MongoDB
const mongoose = require("mongoose")

mongoose.set('strictQuery' , false)

info('Connecting to ',config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch(err => {
    error('error connecting to MongoDB: ',err.message)
  })

//Middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use("/api/notes",notesRouter)


app.get("/greetings",(req,res) => {
  res.end("Hello world!!yo")
})

app.get("/test",(req,res) => {
  res.send("<h1>Please...baby please</h1>")
})

app.post("/sample" , (req,res) => {
  console.log(req.body.content)
})

app.use(middleware.errorHandler)

module.exports = app