const util = require("util");
const fs = require("fs");

//array variables
const tables = "./db/tables.json";
const waitlist = "./db/waitlist.json";

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



class DB {
  async readTables(){
    try {
        const tablesRaw = await readFileAsync(tables, "UTF8");
        return tablesRaw ? JSON.parse(tablesRaw) : []
    } catch (error) {
        console.log("Something went wrong READING tables ", error)
    }
  }

  writeTables(){

  }

  async readWaitlist(){
    try {
        const waitlistRaw = await readFileAsync(waitlist, "UTF8");
        return waitlistRaw ? JSON.parse(waitlistRaw) : []
    } catch (error) {
        console.log("Something went wrong READING waitlist ", error)
    }
  }

  writeWaitlist(){
    
  }
}

module.exports = new DB();