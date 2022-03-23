INSERT INTO department (name)
VALUES ('IT'),
       ('Finance'),
       ('Human Resource'),
       ('Marketing'),
       ('Research and development');

INSERT INTO roles (title, salary, department_id)
VALUES ('IT Manager', 100000, 1),
       ('Software developer', 90000, 1),
       ('Account Manager', 120000, 2),
       ('Accountant', 80000, 2),
       ('Marketing Lead', 150000, 3),
       ('Marketing Intern', 50000, 3),
       ('R&D Manager', 150000, 4),
       ('Research scientist', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jon','Saw', 1, NULL),
        ('Priyanka','Pat', 2, 1),
        ('Sarah','Penn', 3, NULL),
        ('Liam','Dunn', 4, 3),
        ('Cecelia','Jose', 5, NULL),
        ('Jayden','Salv', 6, 5),
        ('Myrah','Xa', 7, NULL),
        ('Aiden','Dhen', 8, 7);