const express = require('express');
const path = require('path');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');


// instantiantes express server
const app = express();
const PORT = process.env.PORT || 3003;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//  middleware that specifies root directory serving static assets
app.use(express.static('public'));


//HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});


// API routes
// gets/reads any current notes that have been generated
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw (err);
    let notes = JSON.parse(data);
    return res.json(notes);
  })
});

// create a note
app.post('/api/notes', (req, res) => {
  let newNote = { ...req.body, id: uuidv1() };
  //console.log(newNote);

  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw (err);
    let pastNote = (JSON.parse(data));
    pastNote.push(newNote);
    //console.log(pastNote);

    fs.writeFile('./db/db.json', JSON.stringify(pastNote), (err) => {
      console.log('Note Created')
    })
  })

  res.json(newNote);
})

app.delete('/api/notes/:id', (req, res) => {
  let deletedId = req.params.id

  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw (err);
    let pastNote = JSON.parse(data);
    let filteredNotes = pastNote.filter(eachNote => eachNote.id != deletedId);
    //console.log("all notes ", pastNote);
    //console.log(filteredNotes);
    fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
      console.log(`Deleted note ${deletedId} successfully`);
    })

    res.json(filteredNotes);
  })
})


// listen method for server
app.listen(PORT, () => {
  console.log(`Server now on port ${PORT}`);
})