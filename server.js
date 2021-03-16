const fs = require('fs');
const express = require('express');
const path = require('path');
const dbNotes = require('./db/db.json');


const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());

app.get()

