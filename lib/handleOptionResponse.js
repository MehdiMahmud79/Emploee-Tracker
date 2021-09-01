const inquirer = require("inquirer");

const viewDepartments = (db, func) => {
  db.query(`
  SELECT
    department.name as department,
    department.id as id
  FROM 
    department;`, (err, res) => {
    console.log(`\n`);
    console.log(`\n`);
    console.log(`_________ Available Departments _______\n`);
    console.table(res);
    console.log(`\n`);

    func();
  });
};

const viewRoles = (db, func) => {
  db.query(`
    SELECT
        role.title as "job title",
        role.id as "role id",
        department.name as "department",
        role.salary 
      FROM 
        role 
      INNER JOIN 
        department 
      ON
        department_id = department.id
        ORDER BY role.id;`,

    (err, res) => {
      console.log(`\n`);
      console.log(
        `__________________________ Available Roles  ___________________________\n`
      );
      console.table(res);
      console.log(`\n`);

      func();
    }
  );
};

const viewEmployees = (db, func) => {
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
        `__________________________ Current Employees  ___________________________\n`
      );
      console.table(res);
      console.log(`\n`);

      func();
    }
  );
};

const addDepartment = (db, func) => {
  inquirer
    .prompt([
    {
      type: 'input',
      message: "Input the new department's name?",
      name: 'depName',
      default: 'Dep'
    },
  ])
    .then(department => {
      var depId
      db.query(`SELECT max(id) as id FROM department;`,(err,res)=>{
        depId=  res[0].id;
        depId++;
     
  db.query(`INSERT INTO department(id, name) VALUES ("${depId}", "${department.depName}");`,(err, res) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Database updated with new department.`);
  }
        viewDepartments(db, func)
    }
  );
  });
 });
};

 currentDepartments= async(db)=> {
  const [data] = await db.promise()

      .query('SELECT id, name FROM department;');
  const departmentChoices = data.map(result => { return {name: result.name, value: result.id} })
  return departmentChoices;
}

const addRole = async (db, func) => {
  const departmentChoices = await currentDepartments(db);
  inquirer
    .prompt([
      {
        type: 'input',
        message: "Input the new role's title?",
        name: 'title',
      },
      {
        type: 'input',
        message: "What is the new role's salary?",
        name: 'salary',
      },
      {
        type: 'list',
        message: "Which department the new role is belong to?",
        choices: departmentChoices,
        name: 'department',
      },
    ])
    .then(role => {
      var roleId
      db.query(`SELECT max(id) as id FROM role;`,(err,res)=>{
        roleId=  res[0].id;
        roleId++;
     
  db.query(`INSERT INTO role(id, title, salary, department_id) VALUES ("${roleId}", "${role.title}", ${role.salary}, ${role.department});`,(err, res) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Database updated with new role.`);
  }
      viewRoles(db, func)
    }
  );
  });
 });
};

const handleOptionResponse = async (db, response, func) => {
  switch (response) {
    case "view all departments":
      viewDepartments(db, func);
      break;
    case "view all roles":
      viewRoles(db, func);
      break;
    case "view all employees":
      viewEmployees(db, func);
      break;
    case "add a department":
      addDepartment(db, func);
      break;
    case "add a role":
      addRole(db, func);
      break;
    case "add an employee":
      addEmployee(db, func);
      break;
    case "update an employee role":
      updateEmployee(db, func);
      break;

    default:
      process.exit();
  }
};

module.exports = handleOptionResponse;
