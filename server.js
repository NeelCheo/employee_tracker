// Imports and requires
const fs = require("fs");
const express = require("express");
const mysql = require("mysql2/promise");
const mainMenu = require("./scripts/index");

// other constants 
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to databases
const dbConnection = async () => {
  const db = await mysql.createConnection({
    host: "localhost",
    // ADD YOUR USERNAME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    user: "root",
    // ADD YOUR PASSOWRD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    password: "",
    multipleStatements: true,
  });
  console.log(`Connected to MySQL Server.`);

  // Read the SQL files
  const schemaFile = fs.readFileSync("./db/schema.sql", "utf8");
  const seedFile = fs.readFileSync("./db/seed.sql", "utf8");

  // Execute the SQL commands in the file to setup the databases
  await db.query(schemaFile);
  console.log(`excuted to schema file.`);
  await db.changeUser({ database: "company_db" });
  console.log(`connected to company_db.`);
  await db.query(seedFile);
  console.log("executed the SQL files.");

  return db;
};

//initalizes the the app
const init = async () => {
  const db = await dbConnection();
  await mainMenu(db);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

//starts the app when you run server.js with node
init();
