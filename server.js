const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname, "index.html"));
})


app.listen(PORT, () => {console.log(`You are listening on ${PORT}`)});
