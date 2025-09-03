<?php
// undoDelete.php

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

// Start session
session_start();

// Check if there is any deleted row to undo
if (isset($_SESSION['deleted_rows']) && count($_SESSION['deleted_rows']) > 0) {
    // Get the last deleted record
    $last_deleted = array_pop($_SESSION['deleted_rows']);
    $table = $last_deleted['table'];
    $data = $last_deleted['data'];

    // Build INSERT query
    $columns = array_keys($data);
    $values = array_map(function($value) use ($conn) {
        return "'" . $conn->real_escape_string($value) . "'";
    }, array_values($data));

    $sql = "INSERT INTO $table (" . implode(",", $columns) . ") VALUES (" . implode(",", $values) . ")";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Undo successful! Record has been restored.'); window.location.href='index.php?table=$table';</script>";
        exit();
    } else {
        echo "Error restoring record: " . $conn->error;
    }
} else {
    echo "<script>alert('No record to undo!'); window.location.href='index.php';</script>";
    exit();
}

$conn->close();
?>
