const inquirer = require("inquirer");

// import db enquires and MiddleWares
const {printToScreen, options, handleOptionResponse} = require("./lib");
const mysql = require("mysql2");
// Creat the database connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",// add your user here: default: root
    password: "qazQAZ2021!", // add your password here
    database: "employees_db",
  },
  printToScreen("✔ Database is connected...⚙")
);

const promptUser = (question) => {
  return inquirer.prompt(question);
};

const chooseOption = () => {
  promptUser(options)
    .then((userOption) => {
      handleOptionResponse(db, userOption.toDo, chooseOption);
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        console.error(error);
      }
    });
};
// start the application
chooseOption();
