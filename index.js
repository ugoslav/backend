const express = require("express");
const cors = require("cors");

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only CSS",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

app.get("/",(req,res) => {
  res.end("Hello world!!yo")
})

app.get("/test",(req,res) => {
  res.send("<h1>Please...baby please</h1>")
})

app.get("/api/notes", (req,res) => {
  res.json(notes)
})

app.get("/api/notes/:uid",(req,res) => {
  const id = parseInt(req.params.uid,10)
  const note = notes.find(note => note.id === id)
  if(note)
    res.json(note)
  else
    res.status(404).send("<h3>OOPS!!Page Not Found.</h3>")
})

app.post('/kyabaat', (req,res) => {
  const body = req.body
  console.log(body)
})

app.post('/api/notes',(req,res) => {

  const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1;
  }
  
  const body = req.body

  if(!body.content)
    return res.status(400).send("<h2>Error : Content Missing</h2>")

  const noteToBeAdded = {
    body : body.content,
    important : body.important || false,
    date : new Date(),
    id : generateId()
  }

  console.log(noteToBeAdded)
  notes = notes.concat(noteToBeAdded)
  res.json(notes)
  //console.log(req.header["content-type"])
})


app.delete("/api/notes/:uid",(req,res) => {
  const id = Number(req.params.uid);
  notes = notes.filter(note => note.id !== id);
  res.status(204).send("<h3>The requested post has been deleted")
})

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
  console.log(`Server running live now on localhost:${PORT}`)
})