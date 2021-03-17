const fs = require('fs');
const express = require('express');
const path = require('path');


//Express/PORT
const app = express()
const PORT = process.env.PORT || 3000;

//Registering the middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());

//Routes retrieving the HTML files
app.get("/notes", function (req,res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"))
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"))
});

//Route retrieving the API for the saved notes and joins them with the "db.json"
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "Develop/db/db.json"))
});

app.listen(PORT, function() {
    console.log("Listening on PORT: " + PORT)
});

