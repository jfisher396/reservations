const fs = require("fs");
const express = require("express");
const router = express.Router();

const DB = require("../db/DB");


// Route to get table data from database
router.get("/api/tables", async function (req, res) {
  const tables = await DB.readTables();
  return res.json(tables);
});
// Route to get waitlist data from database
router.get("/api/waitlist", async function (req, res) {
  const waitlist = await DB.readWaitlist();
  return res.json(waitlist);
});

// route to create a new reservation
router.post("/api/tables", async function (req, res) {
  
  const newRes = req.body;
  const tables = await DB.readTables();
  
  console.log(tables.length)

  if (tables.length < 5) {
    
    newRes.hasTable = true;
    await DB.writeTables([...tables, newRes])
    
  } else {
    const waitlist = await DB.readWaitlist();
    newRes.hasTable = false;
    await DB.writeWaitlist([...waitlist, newRes])
  }

  res.json(newRes);
});

// app.put("/api/waitlist/:id", function(req,res) {
//   console.log(req.body.id)
//   res.send(`Got a PUT request at ${req.body.id}`)
// })

// route to remove a table from the tables list
router.delete("/api/tables/:id", function (req, res) {
  const tableToDelete = req.params.id;
  const updatedTables = [];

  for (let i = 0; i < tables.length; i++) {
    if (tableToDelete !== tables[i].id) {
      updatedTables.push(tables[i]);
    }
  }

  fs.writeFile(
    __dirname + "/../db/tables.json",
    JSON.stringify(updatedTables, null, "\t"),
    function (err, data) {
      if (err) {
        return console.log(err);
      }
      console.log("table deleted");
    }
  );

  return res.send(updatedTables);
});

module.exports = router;