const inquirer = require("inquirer");

const promptUser = async (questions) => {
  const answer = await inquirer.prompt(questions);
  return answer;
};

const mainMenu = async () => {
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
      // MySQL code to view all departments
      await mainMenu();
      break;
    case "View all roles":
      // MySQL code to view all roles
      await mainMenu();
      break;
    case "View all employees":
      // MySQL code to view all employees
      await mainMenu();
      break;
    case "Add a department":
      await addDepartment();
      await mainMenu();
      break;
    case "Add a role":
      await addRole();
      await mainMenu();
      break;
    case "Add an employee":
      await addEmployee();
      await mainMenu();
      break;
    case "Update an employee role":
      await updateEmployeeRole();
      await mainMenu();
      break;
    case "Exit":
      process.exit();
  }
};

const addDepartment = async () => {
  const answer = await promptUser([
    {
      type: "input",
      name: "departmentName",
      message: "Enter the name of the department:",
    },
  ]);

  // MySQL code to add a department
};

const addRole = async () => {
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
      type: "input",
      name: "departmentId",
      message: "Enter the department ID for the role:",
    },
  ]);

  // MySQL code to add a role
};

const addEmployee = async () => {
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
      type: "input",
      name: "roleId",
      message: "Enter the role ID for the employee:",
    },
    {
      type: "input",
      name: "managerId",
      message: "Enter the manager ID for the employee (leave blank if no manager):",
    },
  ]);

  // MySQL code to add an employee
};

const updateEmployeeRole = async () => {
  const answer = await promptUser([
    {
      type: "input",
      name: "employeeId",
      message: "Enter the employee ID to update:",
    },
    {
      type: "input",
      name: "newRoleId",
      message: "Enter the new role ID for the employee:",
    },
  ]);

  // MySQL code to update an employee role
};

// Start the application if needed for testing
// mainMenu();


module.exports = mainMenu;