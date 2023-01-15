//Dependencies for this application
const express = require("express");
const fs = require("fs");
const path = require('path');

//Initialize the app & create environment variable port
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware methods to deal with incoming data in req.body & serve static files from '/public'
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//API/notes post route
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let newNote = req.body;
    newNote.id = Math.floor(Math.random() * 5000);
    notes.push(newNote);
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(newNote);
      return console.log("Added new note: " + newNote.title);
  });
  }); 
});

//API/notes delete route deletes note with specific ID
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

//API Routes
//GET route to get note with specific id 
app.get('api/notes/:id', (req, res) =>{
  //Return JSON using res.json()
  res.json(notes[req.params.id]);
});

//GET route to get notes
app.get('/api/notes', (req, res) => {
  //Read db.json file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //If callback function error, throw error
    if (err) throw err;
    //Store data from callback function in notes variable
    var notes = JSON.parse(data);
    //Return JSON of notes
    res.json(notes);
  });
});

//HTML Routes
//GET route to return absolute file paths for notes.html & index.html
app.get('/notes', (req, res) => {
    res.sendFile('/public/notes.html',{root:__dirname});
});

app.get('*', (req, res) => {
   res.sendFile('/public/index.html',{root:__dirname});
});

//Listener to return data inside app.listen callback
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
});
