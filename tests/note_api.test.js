const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
    await Note.deleteMany({})
    
    const noteObjects = helper.initialNotes
        .map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
})

describe('when there is initially some notes saved' , () => {

    test('notes are returned as json' , async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('all notes are returned ', async () => {
        const response = await api.get('/api/notes')
        
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })
    
    test('a specific note is returned within the database' , async () => {
        const response = await api.get('/api/notes')
        
        const contents = response.body.map(r => r.content)
        
        expect(contents).toContain(
            "Browser can execute only JavaScript"
            )
        })
    })
    
describe('viewing a specific note' , () => {
    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDB()
    
        const noteToView = notesAtStart[0]
    
        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        expect(resultNote.body).toEqual(noteToView)
    })

    test('fails with statuscode 404 if note does not exist' , async () => {
        const validNoteExistingId = await helper.nonExistingId()

        await api
            .get(`/api/notes/${validNoteExistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 if id is invalid' , async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe("addition of a new note" , () => {

    test('a valid note can be added' , async () => {
        const newNote = {
            content : 'async/await makes life easier',
            important : true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const notesAtEnd = await helper.notesInDB()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    
        const contents = notesAtEnd.map(r => r.content)
    
        expect(contents).toContain(
            'async/await makes life easier'
        )
    })


    test('note without content is not added' , async () => {
        const noNote = {
            important : true
        }
    
        await api
            .post('/api/notes')
            .send(noNote)
            .expect(400)
        
        const notesAtEnd = await helper.notesInDB()
    
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})


describe("deletion of a note" , () => {

    test('a note can be deleted', async () => {
        const notesAtStart = await helper.notesInDB()
    
        const noteToDelete = notesAtStart[0]
    
        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)
    
        const notesAtEnd = await helper.notesInDB()
    
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
    
        const contents = notesAtEnd.map(r => r.content)
    
        expect(contents).not.toContain(noteToDelete.content)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})