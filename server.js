const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//array variables
const tables = [
    {
        id: "001",
        name: "James Fisher",
        partySize: 4,
        phone: "555-1234"
    }
]
const waitlist = [
    {
        id: "006",
        name: "Doug Jones",
        partySize: 3,
        phone: "555-2233"
    }
]

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

app.get("/api/tables", function(req,res) {
    return res.json(tables)
})

app.get("/api/waitlist", function(req,res) {
    return res.json(waitlist)
})


app.post("/api/tables", function(req,res ) {
    const newRes = req.body;
    if(tables.length < 5){
        tables.push(newRes);
        newRes.hasTable = true;
    } else {
        waitlist.push(req.body);
        newRes.hasTable = false;
    }
    
    res.json(newRes);
})

//set the app to listen on PORT and console log the PORT number
app.listen(PORT, () => {console.log(`You are listening on ${PORT}`)});
