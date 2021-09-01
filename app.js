const inquirer = require("inquirer");
 require("./lib");
 const mysql = require('mysql2');

const log=console.log;
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'qazQAZ2021!',
    database: 'employees_db',
  },
  console.log(`Database is connected.`)
);


const promptUser = question => {
    return inquirer.prompt(question);
  };


const chooseOption = () => {
    // console.clear();
    promptUser(options)
    .then((userOption) => {        
        handleOptionResponse(db, userOption.toDo,chooseOption);
        
        })
    .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
            console.error(error)
        }

})
}
chooseOption();