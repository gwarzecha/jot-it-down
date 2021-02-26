const express = require('express');
//const path = req('path');
const fs = require('fs');

// instantiantes express server
const app = express();
const PORT = process.env.port || 3003;

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




// listen method for server
app.listen(PORT, () => {
  console.log(`Server now on port ${PORT}`);
})