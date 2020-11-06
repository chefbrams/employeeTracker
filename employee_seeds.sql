INSERT INTO employee_db.departments (id, name)
VALUES (1, "Engineering");

INSERT INTO employee_db.departments (id, name)
VALUES (2, "Admin");

INSERT INTO employee_db.departments (id, name)
VALUES (3, "Legal");

INSERT INTO employee_db.departments (id, name)
VALUES (4, "Marketing");

INSERT INTO employee_db.roles (id, title, salary, department_id, manager)
VALUES (1, "Principal Technical Advisor", 200000, 1, 1);

INSERT INTO employee_db.roles (id, title, salary, department_id, manager)
VALUES (2, "Senior Engineer", 200000, 1, 0);

INSERT INTO employee_db.roles (id, title, salary, department_id, manager)
VALUES (3, "Senior Financial Analyst", 150000, 2, 1);

INSERT INTO employee_db.roles (id, title, salary, department_id, manager)
VALUES (4, "Junior Engineer", 80000, 2, 0);

INSERT INTO employee_db.roles (id, title, salary, department_id, manager)
VALUES (5, "Senior Legal Analyst", 175000, 3, 1);

INSERT INTO employee_db.roles (id, title, salary, department_id, manager)
VALUES (6, "Junior Legal Analyst", 90000, 3, 0);

INSERT INTO employee_db.roles (id, title, salary, department_id, manager)
VALUES (7, "Marketing Manager", 140000, 4, 1);

INSERT INTO employee_db.roles (id, title, salary, department_id, manager)
VALUES (8, "Sales Rep", 60000, 4, 0);


INSERT INTO employee_db.employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Hank", "Hill", 1, NULL);

INSERT INTO employee_db.employees (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Peggy", "Hill", 2, 1);

INSERT INTO employee_db.employees (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Dale", "Gribble", 3, NULL);

INSERT INTO employee_db.employees (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Bill", "Doughetry", 4, 3);

INSERT INTO employee_db.employees (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Boomhower", "Boomhower", 5, NULL);

INSERT INTO employee_db.employees (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Brad", "Jordan", 6, 5);

INSERT INTO employee_db.employees (id, first_name, last_name, role_id, manager_id)
VALUES (7, "William", "Dennis", 7, NULL);

INSERT INTO employee_db.employees (id, first_name, last_name, role_id, manager_id)
VALUES (8, "James", "Prince", 8, 7);