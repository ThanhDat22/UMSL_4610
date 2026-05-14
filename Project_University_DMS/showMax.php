<?php
// showMax.php

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

// Get table and column from GET
$table = isset($_GET['table']) ? $_GET['table'] : '';
$column = isset($_GET['column']) ? $_GET['column'] : '';

if ($table && $column) {
    $sql = "SELECT MAX($column) AS max_value FROM $table";
    $result = $conn->query($sql);

    if ($result && $row = $result->fetch_assoc()) {
        echo $row['max_value'];
    } else {
        echo "Error fetching max value.";
    }
} else {
    echo "Invalid table or column.";
}

$conn->close();
?>
