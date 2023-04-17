INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Tech");



INSERT INTO role (title, department_id, salary)
VALUES ("Sales Lead", 1, 100000),
       ("Salesperson", 1, 80000),
       ("Chief Engineer", 2, 200000),
       ("Electrical Engineer", 2, 150000),
       ("Account Manager", 3, 160000),
       ("Accountant", 3, 100000),
       ("Chief Legal Officer", 4, 250000), 
       ("Lawyer", 4, 130000),
       ("Lead Web Developer", 5, 130000),
       ("Web Designer", 5, 120000);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Darin", "Steele", 1, NULL),
       ("Phillip", "Smith", 2, 1),
       ("Mike", "Chang", 3, NULL),
       ("Susan", "Sanchez", 4, 3),
       ("Tony", "Banks", 5, NULL),
       ("Jacob", "Green", 6, 5),
       ("Kim", "Robbins", 7, NULL),
       ("Saul", "Sharp", 8, 7),
       ("Marilyn", "Webb", 9, NULL),
       ("Elliot", "West", 10, 9);

       
