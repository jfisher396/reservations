//array variables
const tables = [];
const waitlist = [];

module.exports = function (app) {
  app.get("/api/tables", function (req, res) {
    return res.json(tables);
  });

  app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
  });

  // route to create a new reservation
  app.post("/api/tables", function (req, res) {
    console.log("req.body", req.body)
    const newRes = req.body;
    if (tables.length < 5) {
      tables.push(newRes);
      newRes.hasTable = true;
    } else {
      waitlist.push(req.body);
      newRes.hasTable = false;
    }

    res.json(newRes);
  });
};
