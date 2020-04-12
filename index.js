//requires the modules
const sql = require("mysql");
const inquirer = require("inquirer");

//sets up the connection to the database into a variable
var connection = mysql.createconnection({
    host: "localhost",
     // Your port; if not 3306
     PORT: 8080,
     // Your username
     user: "root",
     // Your password
     password: "Queens23",
     database: "employee_db"
});

//connects to the data base
connection.connect(function(err){
    if (err) throw err
    //calls the first function
    intial();
});

function intial(){
    //calls inquirer
    inquirer
    .prompt(
        {
            type: "list",
            message: "What would you like to do?",
            name: "choices",
            choices: [
                "View Employees", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Exit"
            ]
        }).then(function(answer){
            //calls the function depending on choice
            switch(answer.choices){
                case "View Employees":
                    viewEmployee();
                    break;
                case "View Department":
                     viewDepartment();
                     break;
                case "View Roles":
                    viewRoles();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Exit":
                    connection.end()
                    break;
            }
        });
        
};
