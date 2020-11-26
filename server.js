const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//public routes
app.use(express.static(path.join(__dirname, 'public')));

//page routes
app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/reserve", function(req,res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

app.get("/tables", function(req,res) {
    res.sendFile(path.join(__dirname, "tables.html"));
})



//set the app to listen on PORT and console log the PORT number
app.listen(PORT, () => {console.log(`You are listening on ${PORT}`)});
