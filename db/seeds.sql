INSERT INTO department (id, name)
VALUES  (1, "Administration"),
        (2, "Information Center"),
        (3, "Financial Support "),
        (4, "Development Center"),
        (5, "Software Support");

INSERT INTO role (id, title, salary, department_id)
VALUES  (101, "Software Engineer", 35000, 5),
        (102, "Front-End Developer", 25000, 4),
        (103, "Back-End Developer", 55000, 4),
        (104, "Social Media Suppot", 20000, 2),
        (105, "Accountant Assistant", 45000, 3),
        (106, "Team Lead", 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("CHRISTINE", "SMITH", 106, NULL),
        ("MICHAEL", "THOMPSON", 101, 1),
        ("EVA", "PULASKI", 102, 1),
        ("JOHN", "GEYER", 103, 1),
        ("EVA", "PULASKI", 104, 2),
        ("SEAN", "NICHOLLS", 105, NULL),
        ("JAMES", "WALKER", 103, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;