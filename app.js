//requires the modules
const mysql = require("mysql");
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
            if (answer.name == "Add Department") {
                addDepartment();
            }
            else if (answer.name == "Add Employee") {
                addEmployee();
            }
            else if (answer.name == "Add Role") {
                addRole();
            }
            else if (answer.name == "Update Employee role") {
                updateEmployee();
            }
            else if (answer.name == "View departments") {
                viewDepartment();
            }
            else if (answer.name == "View employees") {
                viewEmployee();
            }
            else if (answer.name == "View roles") {
                viewRole();
            }
            else if (answer.name == "Exit"){
                connection.end();
            }
        });
        
};

function addDepartment(){
    //calls inquirer
    inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "department"
      }
    ]).then(answer => {
      //places the answer into the database
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.department
          },
          function(err) {
            if (err) throw err;
          })
        console.log(`\n ${answer.department} added\n`);
          //calls the intial function to restart the questioning
          intial();
     }); 
}
const addEmployee = () => {
    // selects the data from the table
    connection.query("SELECT * FROM role", (err,res) => {
      if(err) throw err;
      })
      
    // asks the user the proper questions  
    inquirer
      .prompt([
        {
          type: "input",
          message: "Employee's first name?",
          name: "first"
        },
        {
          type: "input",
          message: "Employee's last name?",
          name: "last"
        },
        {
          type: "list",
          message: "Employee's role?",
          name: "role",
          choices: newRole
        }
      ]).then(answer => {
        let roles;
        // Loop through the response from selecting all from role table
          for (let i = 0; i < res.length; i++) {
            // conditional
              if (res[i].title == answer.role) {
                  roles = res[i].roles;
              }
          }
      
        // inserts answer into the database
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: roles
          },
          function(err) {
            if (err) throw err;
            console.log(`\n New employee ${answer.first} ${answer.last} has been added\n`);
            // 
            start();
          }
        );
      })
    
}
   function addRole(){
    connection.query("SELECT * FROM department", (err,res) => {
        if(err) throw err;
        // Use map method to create a array for the names 
        const departments = res.map((name1) => {
          return `${name1.name}`
        })
        
      // use inquirer to prompt user to some questions to collect info 
      inquirer
        .prompt([
          {
            type: "input",
            message: "What new role would you like to add?",
            name: "role"
          },
          {
            type: "input",
            message: "hourly rate for the new role?",
            name: "rate"
          },
          {
            type: "list",
            message: "What department does this new role belong to?",
            name: "department",
            choices: departmentName
          }
        ]).then(answer => {
          let departmentTitle;
            for (let i = 0; i < res.length; i++) {
              
                if (res[i].name == answer.department) {
                    departmentTitle = res[i].department_id;
                }
            }
        
          // when finished prompting, insert a new item into the db with that info
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: answer.role,
              salary: answer.salary,
              department_id: departmentId
            },
            function(err) {
              if (err) throw err;
              console.log(`\n New role ${answer.role} has been added\n`);
              // re-prompt the user for what to do next
              start();
            }
          );
        })
      })
    }
   