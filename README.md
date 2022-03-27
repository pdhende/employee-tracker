# Employee Tracker

## Table of contents
* [Description](#description)
* [Screenshots](#screenshots)
* [Built with](#built-with)
* [How it works](#how-it-works)
* [License](#license)

## Description
  The Employee tracker is a robust Content Management System. It enables the user to easily access company information such as departments, roles and employees. The user can view or manage the company database. 
  
## Screenshots
![image](https://user-images.githubusercontent.com/65467469/160265017-87df86a1-004d-4bf5-9cb2-be027f98fbfe.png)

![image](https://user-images.githubusercontent.com/65467469/160265036-f01ce3e8-0194-41c1-a6cc-d0cee2143d64.png)

To watch the demo please follow URL : 
https://drive.google.com/file/d/1gMsZlWGykdYsxo5x9gI3s4fhZL2FmVMB/view

## Built with
This application is built using :
* Node js
  * Inquirer package
  * MySQL2 package
  * console.table package

## How it works
1. Install using the command:

    * npm i

2. Run the command:

    * node server.js

3. Answer the questions prompted at the terminal 
    * User is prompted with the following options : 
    * View all departments, View all roles, View all employees, Add a department, Add a role, Add an employee, Update an employee role, Delete a department and View department budget
4. When user selects ‘View all departments’
 * All department names are displayed.
5. When user selects ‘View all roles’
 * All roles and the department they belong to are displayed.
6. When user selects ‘View all employees’
  * All the employee information is displayed
7. When user selects ‘Add a department’
 * User is prompted with question regarding the new department
* The new department is added to the database
8. When user selects ‘Add a role’
 * User is prompted with questions regarding the new role
 * The new role is added to the database
9. When user selects ‘Add an employee’
 * User is prompted with questions regarding the new role
 * The new employee details are added to the database
10. When user selects ‘Update an employee role’
 * User is prompted with questions regarding the employee
 * The employee is assigned a new role based on user selection
11. When user selects ‘Delete a department’
 * User is prompted with questions regarding the department
 * The selected department is deleted from the database
12. When user selects ‘View department budget’
  * The department names and their corresponding total utilized budget is displayed.
13. When user selects ‘Quit
 * User is exited from the application.
	
## License
 This application is licensed under the [MIT]( https://github.com/pdhende/employee-tracker/blob/main/LICENSE) license.

