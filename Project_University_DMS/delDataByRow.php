<?php
// delDataByRow.php

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

// Start session to store deleted rows for undo
session_start();
if (!isset($_SESSION['deleted_rows'])) {
    $_SESSION['deleted_rows'] = [];
}

// Get current table and ID
$current_table = isset($_GET['table']) ? $_GET['table'] : 'student';
$primary_key = isset($_GET['id']) ? $_GET['id'] : '';

// Fetch columns
$columns = [];
$result = $conn->query("SHOW COLUMNS FROM $current_table");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $columns[] = $row['Field'];
    }
}

// Fetch the record to delete
if ($primary_key != '') {
    $pk_field = $columns[0];
    $stmt = $conn->prepare("SELECT * FROM $current_table WHERE $pk_field = ?");
    $stmt->bind_param("s", $primary_key);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result && $result->num_rows > 0) {
        $record = $result->fetch_assoc();
        $_SESSION['deleted_rows'][] = ['table' => $current_table, 'data' => $record];

        // Now delete the record
        $del_stmt = $conn->prepare("DELETE FROM $current_table WHERE $pk_field = ?");
        $del_stmt->bind_param("s", $primary_key);
        if ($del_stmt->execute()) {
            echo "<script>alert('Record deleted successfully!'); window.location.href='index.php?table=$current_table';</script>";
            exit();
        } else {
            echo "Error deleting record: " . $conn->error;
        }
    }
}

$conn->close();
?>
