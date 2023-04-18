const inquirer = require("inquirer");

const promptUser = async (questions) => {
  const answer = await inquirer.prompt(questions);
  return answer;
};

const mainMenu = async (db) => {
  const answer = await promptUser([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
      "View all departments", 
      "View all roles", 
      "View all employees", 
      "Add a department", 
      "Add a role", 
      "Add an employee",
      "Update an employee role", 
      "Exit",
    ],
    },
  ])
  switch (answer.choice) {
    case "View all departments":
      const [departments] = await db.query("SELECT * FROM department");
      console.table(departments);
      await mainMenu(db);
      break;
    case "View all roles":
      const [roles] = await db.query(
        `SELECT role.id, role.title, role.salary, department.name as department
        FROM role
        LEFT JOIN department ON role.department_id = department.id;`
      );
      console.table(roles);
      await mainMenu(db);
      break;
    case "View all employees":
      const [employees] = await db.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title as role, 
        CONCAT(manager.first_name, ' ', manager.last_name) as manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN employee manager ON employee.manager_id = manager.id;`
      );
      console.table(employees);
      await mainMenu(db);
      break;
    case "Add a department":
      await addDepartment(db);
      await mainMenu(db);
      break;
    case "Add a role":
      await addRole(db);
      await mainMenu(db);
      break;
    case "Add an employee":
      await addEmployee(db);
      await mainMenu(db);
      break;
    case "Update an employee role":
      await updateEmployeeRole(db);
      await mainMenu(db);
      break;
    case "Exit":
      process.exit();
  }
};

const addDepartment = async (db) => {
  const answer = await promptUser([
    {
      type: "input",
      name: "departmentName",
      message: "Enter the name of the department:",
    },
  ]);
  await db.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName]);
};

const addRole = async (db) => {
  const [departments] = await db.query("SELECT * FROM department");
  const answer = await promptUser([
    {
      type: "input",
      name: "roleName",
      message: "Enter the name of the role:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for the role:",
    },
    {
      type: "list",
      name: "departmentName",
      message: "Select the department for the role:",
      choices: departments.map(department => department.name),
    },
  ]);

  const department = departments.find(department => department.name === answer.departmentName);

  await db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [
    answer.roleName,
    answer.salary,
    department.id,
  ]);
};

const addEmployee = async (db) => {
  const [roles] = await db.query("SELECT * FROM role");
  const [managers] = await db.query("SELECT * FROM employee WHERE manager_id IS NULL");
  const answer = await promptUser([
    {
      type: "input",
      name: "firstName",
      message: "Enter the first name of the employee:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the last name of the employee:",
    },
    {
      type: "list",
      name: "roleId",
      message: "Select the role for the employee:",
      choices: roles.map(role => ({ name: role.title, value: role.id })),
    },
    {
      type: "list",
      name: "managerId",
      message: "Select the manager for the employee:",
      choices: [
        { name: "No manager", value: null },
        ...managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
      ],
    },
  ]);
  await db.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [
      answer.firstName,
      answer.lastName,
      answer.roleId,
      answer.managerId || null,
    ]
  );
};

const updateEmployeeRole = async (db) => {
  const [employees] = await db.query("SELECT * FROM employee");
  const [roles] = await db.query("SELECT * FROM role");
  const answer = await promptUser([
    {
      type: "list",
      name: "employeeId",
      message: "Select the employee to update:",
      choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
    },
    {
      type: "list",
      name: "newRoleId",
      message: "Select the new role for the employee:",
      choices: roles.map(role => ({ name: role.title, value: role.id })),
    },
  ]);
  await db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
    answer.newRoleId,
    answer.employeeId,
  ]);
};

// Start the application if needed for testing
// mainMenu(db);


module.exports = mainMenu;