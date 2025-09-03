USE company;

SELECT Fname, Lname
FROM EMPLOYEE
WHERE Address LIKE '%Houston, TX%';

SELECT Fname, Lname
FROM EMPLOYEE
WHERE Address REGEXP 'Houston, TX';

SELECT Fname, Lname
FROM EMPLOYEE
WHERE Address REGEXP '^[0-9]{3}.* CA$';

SELECT Fname, Lname
FROM EMPLOYEE
WHERE Fname REGEXP '^[A|B|C]';

SELECT Fname, Lname
FROM EMPLOYEE
WHERE Lname REGEXP '^.{6}$';