<?php
// transcript.php

// Connect to MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Transcript</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>Transcript</h1>
<nav>
    <a href="index.php">Home</a> |
    <a href="transcript.php">Transcript</a>
</nav>

<?php
// SQL Query to JOIN all required tables
$sql = "
SELECT s.name AS student_name, 
       c.course_number, 
       m.semester, 
       m.year, 
       m.section_identifier, 
       g.grade
FROM student s
JOIN grade_report g ON s.student_number = g.student_number
JOIN section m ON g.section_identifier = m.section_identifier
JOIN course c ON m.course_number = c.course_number
ORDER BY s.name, m.year, m.semester
";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo "<table border='1'>";
    echo "<tr><th>Student Name</th><th>Course Number</th><th>Semester</th><th>Year</th><th>Section ID</th><th>Grade</th></tr>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($row['student_name']) . "</td>";
        echo "<td>" . htmlspecialchars($row['course_number']) . "</td>";
        echo "<td>" . htmlspecialchars($row['semester']) . "</td>";
        echo "<td>" . htmlspecialchars($row['year']) . "</td>";
        echo "<td>" . htmlspecialchars($row['section_identifier']) . "</td>";
        echo "<td>" . htmlspecialchars($row['grade']) . "</td>";
        echo "</tr>";
    }

    echo "</table>";
} else {
    echo "No transcript records found.";
}

$conn->close();
?>

</body>
</html>
