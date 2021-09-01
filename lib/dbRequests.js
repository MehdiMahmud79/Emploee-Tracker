const colors = require('colors/safe');
const inquirer = require("inquirer");

const printToScreen = (text) =>{
console.log("\n")
  console.log(colors.red.bold.bgWhite(`    ${text}   \n`))};

currentEmploees = async (db) => {
  const [data] = await db
    .promise()
    .query("SELECT employee_id, first_name, last_name FROM employee;");
  const emploees = data.map((employee) => {
    return {
      name: `${employee.employee_id}: ${employee.first_name} ${employee.last_name}`,
      value: employee.employee_id,
    };
  });
  return emploees;
};

currentDepartments = async (db) => {
  const [data] = await db.promise().query("SELECT id, name FROM department;");
  const departmentChoices = data.map((result) => {
    return { name: result.name, value: result.id };
  });
  return departmentChoices;
};

currentRoles = async (db) => {
  const [data] = await db
    .promise()
    .query("SELECT id, title, salary, department_id FROM role;");
  const availableRoles = data.map((role) => {
    return { name: role.title, value: role.id };
  });
  return availableRoles;
};

ManagerList = async (db) => {
  const [data] = await db
    .promise()
    .query("SELECT employee_id, first_name, last_name FROM employee;");
  const managers = data.map((employee) => {
    return {
      name: `${employee.first_name}  ${employee.last_name}`,
      value: employee.employee_id,
    };
  });
  return managers;
};

const viewDepartments = (db, callBackFun) => {
  db.query(
    `
  SELECT
    department.name as department,
    department.id as id
  FROM 
    department;`,
    (err, res) => {
      console.log(`\n`);
      console.log(`\n`);
      console.log(
        colors.brightWhite.bold.bgRed(
          "           Available Departments          \n"
        )
      );
      console.table(res);
      printToScreen("All departments are shown above");
      callBackFun();
    }
  );
};

const viewRoles = (db, callBackFun) => {
  db.query(
    `
    SELECT
        R.title as "job title",
        R.id as "role id",
        D.name as "department",
        R.salary 
      FROM 
        role R
      INNER JOIN 
        department D
      ON
        R.department_id = D.id
        ORDER BY R.id;`,

    (err, res) => {
      console.log(`\n`);
      console.log(`\n`);
      console.log(
        colors.brightWhite.bold.bgRed(
          `                                  Available Roles                               \n`
        )
      );
      console.table(res);
      printToScreen("All Roles are shown above");

      callBackFun();
    }
  );
};

const viewEmployees = (db, callBackFun) => {
  db.query(
    `SELECT 
      E.employee_id,
      E.first_name,
      E.last_name,
      R.title as 'job title',
      D.name as "department",
      R.salary as "salary",
      EE.first_name  as "manager"
    FROM 
      employee E
    LEFT JOIN 
      role R
    ON
      E.role_id = R.id 
    LEFT JOIN
      department  D
    ON 
      R.department_id=D.id
    LEFT JOIN
      employee  EE
    ON 
      E.manager_id=EE.employee_id   
    ORDER BY E.employee_id;`,
    (err, res) => {
      console.log(`\n`);
      console.log(
        colors.brightWhite.bold.bgRed(
          `                                   Current Employees                                                                        \n`
        )
      );
      console.table(res);
      console.log(`\n`);
      printToScreen("All Employees are shown above");

      callBackFun();
    }
  );
};

const addDepartment = (db, callBackFun) => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Input the new department's name?",
        name: "depName",
        default: "Dep",
      },
    ])
    .then((department) => {
      var depId;
      db.query(`SELECT max(id) as id FROM department;`, (err, res) => {
        depId = res[0].id;
        depId++;

        db.query(
          `INSERT INTO department(id, name) VALUES ("${depId}", "${department.depName}");`,
          (err, res) => {
            if (err) {
              console.error(err);
            } else {
              printToScreen("Database updated with new department.");
            }
            viewDepartments(db, callBackFun);
          }
        );
      });
    });
};

const addRole = async (db, callBackFun) => {
  const departmentChoices = await currentDepartments(db);
  inquirer
    .prompt([
      {
        type: "input",
        message: "Input the new role's title?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the new role's salary?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department the new role is belong to?",
        choices: departmentChoices,
        name: "department",
      },
    ])
    .then((role) => {
      var roleId;
      db.query(`SELECT max(id) as id FROM role;`, (err, res) => {
        roleId = res[0].id;
        roleId++;

        db.query(
          `INSERT INTO role(id, title, salary, department_id) VALUES ("${roleId}", "${role.title}", ${role.salary}, ${role.department});`,
          (err, res) => {
            if (err) {
              console.error(err);
            } else {
              printToScreen("Database updated with new role.");
            }
            viewRoles(db, callBackFun);
          }
        );
      });
    });
};

const addEmployee = async (db, callBackFun) => {
  const availableRoles = await currentRoles(db);
  const managers = await ManagerList(db);
  inquirer
    .prompt([
      {
        type: "input",
        message: "Input the new employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "Input the new employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "Choose the new employee's role?",
        choices: availableRoles,
        name: "role",
      },
      {
        type: "list",
        message: "Who is the new employee's manager?",
        choices: managers,
        name: "manager",
      },
    ])
    .then((employee) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.firstName}", "${employee.lastName}", ${employee.role}, ${employee.manager});`,
        (err, res) => {
          if (err) {
            console.error(err);
          } else {
            printToScreen("Database updated with new employee.");
          }
          viewEmployees(db, callBackFun);
        }
      );
    });
};

const updateEmployee = async (db, callBackFun) => {
  const emploeesIdList = await currentEmploees(db);
  const availableRoles = await currentRoles(db);
  let managers = await ManagerList(db);

  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose an employee to update the role?",
        choices: emploeesIdList,
        name: "employeeId",
      },
      {
        type: "list",
        message: "Choose the new employee's role?",
        choices: availableRoles,
        name: "Newrole",
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        choices: [...managers, "NULL"],
        name: "manager",
      },
    ])
    .then((employee) => {
      db.query(
        `UPDATE employee SET role_id = ${employee.Newrole}, manager_id = ${employee.manager} WHERE employee_id = ${employee.employeeId};`,
        (err, res) => {
          if (err) {
            console.error(err);
          } else {
            printToScreen("Database updated with new employee's role.");
          }
          viewEmployees(db, callBackFun);
        }
      );
    });
};

module.exports = {
  printToScreen,
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
};
