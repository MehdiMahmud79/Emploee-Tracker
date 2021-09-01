const viewDepartments = () => {
  
  
};

const viewRoles = () => {
  console.log("im in viewRoles");
};
const viewEmployees = () => {
  console.log("im in dep view");
};

const addDepartment = () => {
  console.log("im in addDepartment");
};

const addRole = () => {
    console.log("im in addRole");
};
const addEmployee = () => {
    console.log("im in addEmployee");
};
const updateEmployee = () => {
    console.log("im in updateEmployee");
};

const handleOptionResponse = async (response) => {
  switch (response) {
    case "view all departments":
      viewDepartments();
      break;
    case "view all roles":
      viewRoles();
      break;
    case "view all employees":
      viewEmployees();
      break;
    case "add a department":
      addDepartment();
      break;
    case "add a role":
      addRole();
      break;
    case "add an employee":
      addEmployee();
      break;
    case "update an employee role":
      updateEmployee();
      break;

    default:
      process.exit();
  }
};

module.exports = handleOptionResponse;
