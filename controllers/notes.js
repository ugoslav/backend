const notesRouter = require('express').Router()
const Note = require("../models/note")

notesRouter.get("/" , (req,res) => {
    Note.find({})
        .then(notes => {
            res.json(notes)
        })
})

notesRouter.get("/:id", (req,res,next) => {
    Note.findById(req.params.id)
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
        })
})

notesRouter.post("/" , (req , res , next) => {
    const body = req.body

    const note = new Note({
        content : body.content,
        important : body.important,
        date : new Date(),
    })

    note.save()
        .then(savedNote => {
            res.json(savedNote)
        })
        .catch(err => next(err))
})

notesRouter.put("/:id" , (req,res,next) => {
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

notesRouter.delete("/:id" , (req,res,next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).send("<h2>The note has been removed</h2>")
        })
        .catch(err => next(err))
})

module.exports = notesRouter