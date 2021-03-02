const util = require("util");
const fs = require("fs");

// variables connected to json files
const tables = "./db/tables.json";
const waitlist = "./db/waitlist.json";

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
  async readTables() {
    try {
      const tablesRaw = await readFileAsync(tables, "UTF8");
      return tablesRaw ? JSON.parse(tablesRaw) : [];
    } catch (error) {
      console.log("Something went wrong READING tables ", error);
    }
  }

  async writeTables(data) {
    try {
      await writeFileAsync(tables, JSON.stringify(data, null, "\t")).then(
        () => {
          console.log("new party added to tables");
        }
      );
    } catch (error) {}
  }

  async readWaitlist() {
    try {
      const waitlistRaw = await readFileAsync(waitlist, "UTF8");
      return waitlistRaw ? JSON.parse(waitlistRaw) : [];
    } catch (error) {
      console.log("Something went wrong READING waitlist ", error);
    }
  }

  async writeWaitlist(data) {
    try {
      await writeFileAsync(waitlist, JSON.stringify(data, null, "\t")).then(() => {
          console.log("new party added to the waitlist");
        });
    } catch (error) {
      throw error;
    }
  }

  async deleteTable(data) {
      
    try {
        await writeFileAsync(tables, JSON.stringify(data, null, "\t").then(() => {
            console.log("table deleted")
        })
    
        );
    } catch (error) {
        throw error;
    }
  }
}

module.exports = new DB();
