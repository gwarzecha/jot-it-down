const express = require('express');
const path = require('path');
const fs = require('fs');

// instantiantes express server
const app = express();
const PORT = process.env.port || 3003;

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


// listen method for server
app.listen(PORT, () => {
  console.log(`Server now on port ${PORT}`);
})