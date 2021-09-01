// at the start of the application the user will be presented with the following options
const options = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'toDo',
    choices: ["view all departments", "view all roles", "view all employees", 
    "add a department", "add a role","add an employee", "update an employee role", "exit"]
};

module.exports = options;