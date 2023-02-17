const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Boijohiro_Kimada:${password}@firstcluster.eax81oe.mongodb.net/exercise?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date : Date,
  important: Boolean,
})

const Note = mongoose.model('SKETCH', noteSchema)

const note = new Note({
  content: 'GET and POST are two of the most important protocols of HTTP',
  date : new Date(),
  important: true,
})

const noteOne = new Note({
  content : 'Browser can only execute CSS',
  date : new Date(),
  important : false,
})

const noteSecond = new Note({
  content : 'HTML is easy',
  date : new Date(),
  important : true,
})

note.save().then(result => {
  console.log('Third note saved too!!!')
  mongoose.connection.close()
})
  
noteOne.save().then(result => {
  console.log('Second note saved!!')
})
  
noteSecond.save().then(result => {
  console.log("First note saved !")
})

/*Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})*/