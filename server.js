//Dependencies for this application
const express = require("express");
const fs = require("fs");
const path = require('path');

//Initialize the app & create environment variable port
const app = express();
const PORT = process.env.PORT || 3001;



//Set up app to handle data parsing, serve static files in directory 'public', parse incoming JSON requests to put in req.body
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let userNote = req.body;
    userNote.id = Math.floor(Math.random() * 5000);
    notes.push(userNote);
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(userNote);
  });
  }); 
});

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
  
  fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err, data) => {
    res.json({msg: 'successfully'});
  });
});
});

app.get('api/notes/:id', (req, res) =>{
  res.json(notes[req.params.id]);
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    res.json(notes);
  });
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/index.html'));
});

//Listener to return data inside app.listen callback
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
});
