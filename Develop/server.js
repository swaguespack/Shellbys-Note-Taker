//Include modules needed for this application
const express = require("express");
const fs = require("fs");
const path = require('path');

//Initialize the app
const app = express();
const PORT = process.env.PORT || 3001;

//Data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));
