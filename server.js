const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//public routes
app.use(express.static(path.join(__dirname, 'public')));

const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

//set the app to listen on PORT and console log the PORT number
app.listen(PORT, () => {console.log(`You are listening on ${PORT}`)});
