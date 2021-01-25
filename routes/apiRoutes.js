const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//TODO: pull in json file(s) to get table and waitlist data
//TODO:

//array variables
const tables = require("../db/tables.json");
const waitlist = require("../db/waitlist.json");

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
      console.log(tables);
      writeFileAsync(__dirname + "/../db/tables.json", JSON.stringify(tables, null, "\t")).then(function (err, data) {
          console.log("new party added to tables");
      }).catch(function(err){
        throw err
      });

    } else {
      waitlist.push(req.body);
      newRes.hasTable = false;

      writeFileAsync(__dirname + "/../db/waitlist.json", JSON.stringify(waitlist, null, "\t"), function (err, data) {
          if (err) {
            return console.log(err);
          }
          console.log("party added to waitlist");
        }
      );
    }

    res.json(newRes);
  });
};
