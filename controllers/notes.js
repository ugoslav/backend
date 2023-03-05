const notesRouter = require('express').Router()
const Note = require("../models/note")

notesRouter.get("/" , async (req,res) => {
    const notes = await Note.find({})
    res.json(notes)
})

notesRouter.get("/:id", async (req, res) => {
    const note = await Note.findById(req.params.id)
    if(note){
        res.json(note)
    } else{
        res.status(404).end()
    }
    /*Note.findById(req.params.id)
        .then(note => {
            if(note){
                res.json(note)
            }
            else{
                res.status(404).json({error : "file not found"})
            }
        })
        .catch(err => {
            next(err)
        })*/
})

notesRouter.post("/" , async (req , res) => {
    const body = req.body

    const note = new Note({
        content : body.content,
        important : body.important || false,
        date : new Date(),
    })
    
    const savedNote = await note.save()
    res.status(201).json(savedNote)
    
    /*note.save()                           //Synchronous alternative
        .then(savedNote => {
            res.status(201).json(savedNote)
        })
        .catch(err => next(err))*/
})

notesRouter.put("/:id" , async (req,res,next) => {

    const body = req.body

    const note = {
        content : body.content,
        important : body.important,
        date : new Date(),
    }

    Note.findByIdAndUpdate(req.params.id , note , {new : true})
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(err => next(err))
})

notesRouter.delete("/:id" , async (req,res) => {

    await Note.findByIdAndRemove(req.params.id)
    res.status(204).end()

    /*Note.findByIdAndRemove(req.params.id)         //Synchronous alternative
        .then(() => {
            res.status(204).send("<h2>The note has been removed</h2>")
        })
        .catch(err => next(err))*/
})

module.exports = notesRouter