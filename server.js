//Dependencies for this application
const express = require("express");
const fs = require("fs");
const path = require('path');

//Initialize the app & create environment variable port
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware to deal with incoming data in req.body & serve static files from '/public'
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Respond to POST request to add notes
app.post('/api/notes', (req, res) => {
  //Read db.json file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //If callback function error, throw error
    if (err) throw err;
    //Store data from callback function in notes variable
    var notes = JSON.parse(data);
    //Access client side data from req.body and store in newNote variable
    let newNote = req.body;
    //Assign random id
    newNote.id = Math.floor(Math.random() * 5000);
    //Add new note element to end of notes array
    notes.push(newNote);
  //Write updated notes back to db.json file
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(newNote);
      //Log new note titles to terminal
      return console.log("Added new note: " + newNote.title);
  });
  }); 
});

//Respond to DELETE request to delete note with specific ID
app.delete('/api/notes/:id', (req, res) => {
  //Read db.json file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //If callback function error, throw error
    if (err) throw err;
    //Store data from callback function in notes variable
    let notes = JSON.parse(data);
    //Filter by note id & store in newNotes
    const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
  //Write updated notes back to db.json file
  fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err, data) => {
    res.json({msg: 'successfully'});
    return console.log("Deleted note successfully");

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
//GET route for notes page
app.get('/notes', (req, res) => {
    res.sendFile('/public/notes.html',{root:__dirname});
});
//GET route for homepage
app.get('*', (req, res) => {
   res.sendFile('/public/index.html',{root:__dirname});
});

//Listener to return data inside app.listen callback
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
});
