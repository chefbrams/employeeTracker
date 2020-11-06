DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
 
  name VARCHAR(30) NOT NULL,
 
  PRIMARY KEY (id)
);

 CREATE TABLE roles (
   id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
 salary DECIMAL(10,4) NOT NULL,
 department_id INT NOT NULL
 manager BOOLEAN NOT NULL default(0),
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
PRIMARY KEY (id)
);