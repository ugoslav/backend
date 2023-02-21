require('dotenv').config()
const express = require("express");
const cors = require("cors");
const Note = require("./models/notes")

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.get("/greetings",(req,res) => {
  res.end("Hello world!!yo")
})

app.get("/test",(req,res) => {
  res.send("<h1>Please...baby please</h1>")
})

app.get("/api/notes", (req,res) => {
  Note.find({}).then(result => {
    res.json(result)
  })
})

const errHandler = (error , req , res , next) => {
  console.log(error.message)
  
  if(error.name === 'CastError') {
    return res.status(400).send({ err : 'malformatted id'})
  }
  
  next(err)
}

app.use(errHandler)

app.get("/api/notes/:uid",(req,res,next) => {
  Note.findById(req.params.uid)
  .then(sketch => {
    if(sketch){
      res.json(sketch)
    }
    else{
      res.status(404).send("<h2>Sorry,not available</h2>")
    }
  })
  .catch(err => next(err))
})

app.post('/kyabaat', (req,res) => {
  const body = req.body
  console.log(body)
})

app.post('/api/notes',(req,res) => {
  
  const body = req.body
  
  if(body.content === undefined){
    return res.status(400).send("<h2>Sorry,no content,no post...")
  }
  
  const note = new Note({
    content : body.content,
    important : body.important,
    date : new Date(),
  })
  
  note.save().then(savedNote =>
    res.json(savedNote)
    )
})

app.put("/api/notes/:uid" , (req, res , next) => {
  const body = req.body
  
  const sketch = {
    content : body.content,
    date : new Date(),
    important : body.important,
  }
  
  Note.findByIdAndUpdate(req.params.uid , sketch , {new : true})
  .then(updatedSketch => {
    res.json(updatedSketch)
  })
  .catch(err => next(err))
})
  
  
app.delete("/api/notes/:uid",(req,res,next) => {
  Note.findByIdAndRemove(req.params.uid)
  .then(result => {
    res.status(204).end("Deleted successfully")
  })
  .catch(err => next(err))
})
  

  
const PORT = process.env.PORT || 3010;
  
app.listen(PORT,() => {
  console.log(`Server running live now on localhost:${PORT}`)
})