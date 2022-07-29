
INSERT INTO department (name)
VALUES 
('Information Technology'),
('Accounting'),
('Sales'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 90000, 1),
('Software Engineer', 120000, 1),
('Accountant', 100000, 2), 
('Finanical Analyst', 150000, 2),
('Sales Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('HR Manager', 100000, 4),
('Operations Specialist', 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 2, null),
('Devin', 'Booker', 1, 1),
('Jaylen', 'Brown', 4, null),
('Jon', 'Jones', 3, 3),
('Tyler', 'Moore', 6, null),
('Javier', 'Sanchez', 5, 5),
('Ray', 'Allen', 7, null),
('Draymond', 'Green', 8, 7);