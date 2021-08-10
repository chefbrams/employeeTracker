const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username-
  user: "root",

  // Your password
  password: "Password1!",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

//Start function
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Role",
        "Exit",
      ],
      //Then run a switch case for each function that corresponds to each action
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Role":
          updateRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

//View departments
function viewDepartments() {
  const query = "SELECT * FROM departments";
  //connection
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // starts
    start();
  });
}

//View roles
function viewRoles() {
  const query = "SELECT id, title FROM roles";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    start();
  });
}

//View  Employees
function viewEmployees() {
  const query =
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    start();
  });
}

//Add department
function addDepartment() {
  //Get name of new department
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is the name of the department you want to add?",
      //This inserts that department into database
    })
    .then(function (answer) {
      const query = "INSERT INTO departments (name) VALUES (?)";
      connection.query(query, answer.name, (err, res) => {
        if (err) throw err;
        if (res.affectedRows > 0) {
          console.log(res.affectedRows + " department added successfully!");
        }
        start();
      });
    });
}

//Add role
function addRole() {
  let array = [];
  //query for departments
  const query = "SELECT id AS value, department_name AS name FROM departments";
  connection.query(query, (err, res) => {
    if (err) throw err;

    array = JSON.parse(JSON.stringify(res));
    //Creates array of questions for new role
    const questions = [
      {
        type: "input",
        name: "name",
        message: "What is the name of the role you want to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role you want to add?",
      },
      {
        type: "list",
        name: "department",
        message: "Which department do you want to add this role to?",
        choices: array,
      },
      {
        type: "confirm",
        name: "manager",
        message: "Is this a manager role?",
      },
    ];
    // This inserts new role into database
    inquirer.prompt(questions).then(function (answer) {
      const query =
        "INSERT INTO roles (role_title, role_salary, department_id, manager) VALUES (?, ?, ?, ?)";
      connection.query(
        query,
        [answer.name, answer.salary, answer.department, answer.manager],
        (err, res) => {
          if (err) throw err;
          if (res.affectedRows > 0) {
            console.log(
              res.affectedRows + " department added successfully added!"
            );
          }
          start();
        }
      );
    });
  });
}

//Add employee
function addEmployee() {
  //Get name
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
    ])
    .then(function (answer) {
      let query =
        "SELECT id AS value, title AS name FROM roles WHERE manager = 0";
      connection.query(query, (err, res) => {
        if (err) throw err;

        let array = JSON.parse(JSON.stringify(res));

        inquirer
          .prompt({
            type: "list",
            name: "role",
            message: "What is the role of this employee?",
            choices: array,
          })
          .then(function (answer2) {
            let query =
              "SELECT employees.id AS value, CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees INNER JOIN roles ON employees.role_id = roles.id WHERE roles.manager = 1";
            connection.query(query, (err, res) => {
              if (err) throw err;

              let array = JSON.parse(JSON.stringify(res));
              inquirer
                .prompt({
                  type: "list",
                  name: "manager",
                  message: "Who manages this employee?",
                  choices: array,
                })
                .then(function (answer3) {
                  const query =
                    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                  connection.query(
                    query,
                    [
                      answer.firstName,
                      answer.lastName,
                      answer2.role,
                      answer3.manager,
                    ],
                    (err, res) => {
                      if (err) throw err;
                      if (res.affectedRows > 0) {
                        console.log(
                          res.affectedRows +
                            " department added successfully added!"
                        );
                      }
                      start();
                    }
                  );
                });
            });
          });
      });
    });
}

function updateRole() {
  inquirer
    .prompt([
      {
        name: "update",
        type: "list",

        choices: ["Update Employee Role"],
      },
    ])
    .then(function (answer) {
      if (answer.update === "Update Employee Role") {
        inquirer
          .prompt([
            {
              name: "role_id",
              type: "number",
              message: "Enter the role id: ",
            },
            {
              name: "id",
              type: "number",
              message: "Enter the employee id: ",
            },
          ])
          .then(function (answer) {
            connection.query(
              "UPDATE employees SET role_id = ? WHERE ?;",
              [
                {
                  role_id: answer.role_id,
                },
                {
                  id: answer.id,
                },
              ],
              function (error) {
                if (error) throw error;
                console.log(
                  `Updated employee with id ${answer.id} to role ${answer.role_id}`
                );
                start();
              }
            );
          });
      }
    });
}
