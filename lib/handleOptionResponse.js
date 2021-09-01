const inquirer = require("inquirer");
const colors = require('colors/safe');
let {
  printToScreen,
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
}=require('./dbRequests');
// --------------------------------------------------------------------------------
//                                handleOption Response 
// --------------------------------------------------------------------------------

const handleOptionResponse = async (db, response, callBackFun) => {
  switch (response) {
    case "view all departments":
      viewDepartments(db, callBackFun);
      break;
    case "view all roles":
      viewRoles(db, callBackFun);
      break;
    case "view all employees":
      viewEmployees(db, callBackFun);
      break;
    case "add a department":
      addDepartment(db, callBackFun);
      break;
    case "add a role":
      addRole(db, callBackFun);
      break;
    case "add an employee":
      addEmployee(db, callBackFun);
      break;
    case "update an employee role":
      updateEmployee(db, callBackFun);
      break;
    case "exit":
      printToScreen("Thank you for using our App")
    process.exit();
  }
};

module.exports = handleOptionResponse;
