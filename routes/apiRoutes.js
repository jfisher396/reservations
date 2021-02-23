const fs = require("fs");
const util = require("util");
//array variables
const tables = require("../db/tables.json");
const waitlist = require("../db/waitlist.json");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


module.exports = function (app) {
  app.get("/api/tables", function (req, res) {
    return res.json(tables);
  });

  app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
  });

  // route to create a new reservation
  app.post("/api/tables", function (req, res) {
    // console.log("req.body", req.body)

    const newRes = req.body;

    if (tables.length < 5) {
      tables.push(newRes);
      newRes.hasTable = true;

      writeFileAsync(__dirname + "/../db/tables.json", JSON.stringify(tables, null, "\t")).then(() => {
          console.log("new party added to tables");
      }).catch(function(err){
        throw err
      });

    } else {
      waitlist.push(newRes);
      newRes.hasTable = false;

      writeFileAsync(__dirname + "/../db/waitlist.json", JSON.stringify(waitlist, null, "\t")).then(() => {
          console.log("party added to waitlist");
      }).catch(function(err){
        throw err
      });
    }

    res.json(newRes);
  });

  // app.put("/api/waitlist/:id", function(req,res) {
  //   console.log(req.body.id)
  //   res.send(`Got a PUT request at ${req.body.id}`)
  // })
  // route to remove a table from the tables list
  app.delete("/api/tables/:id", function(req,res) {
    
    const tableToDelete = req.params.id;
    const updatedTables = [];

    for (let i = 0; i < tables.length; i++) {
        if (tableToDelete !== tables[i].id) {
            updatedTables.push(tables[i])
        }
    }

    fs.writeFile(__dirname + "/../db/tables.json", JSON.stringify(updatedTables, null, "\t"), function (err, data) {
        if (err) {
          return console.log(err);
        }
        console.log("table deleted");
      }
    );

      return res.send(updatedTables)
  })
};
