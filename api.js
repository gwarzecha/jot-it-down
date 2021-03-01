const router = require('express').Router();
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');


// API routes
// gets/reads any current notes that have been generated
router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw (err);
    let notes = JSON.parse(data);
    return res.json(notes);
  })
});

// create a note
router.post('/notes', (req, res) => {
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

router.delete('/notes/:id', (req, res) => {
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
});

module.exports = router