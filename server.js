const fs = require('fs');
const express = require('express');
const path = require('path');
const uuid = require('uuid');
const dbJson = require('./db/db.json')



//Express/PORT
const app = express()
const PORT = process.env.PORT || 3000;

//Registering the middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());

//Routes retrieving the HTML files
app.get("/notes", function (req,res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

//Route retrieving the API for the saved notes and joins them with the "db.json"
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

//Posting notes on the app/dbjson
app.post("/api/notes", (req, res) => {
    const dbNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    dbNotes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(dbNotes));
    res.json(dbNotes);
});

//Deletes the notes from app/dbjson
app.delete("/api/notes/:id", (req,res) => {
    const dbNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    const trash = dbNotes.filter((delNote) => delNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(trash));
    res.json(trash); 
})

app.listen(PORT, function() {
    console.log("Listening on PORT: " + PORT)
});

