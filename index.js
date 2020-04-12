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
})