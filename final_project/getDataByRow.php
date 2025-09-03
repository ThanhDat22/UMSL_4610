<?php
// getDataByRow.php

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

// Get current table from URL
$current_table = isset($_GET['table']) ? $_GET['table'] : 'student';

// Fetch columns
$columns = [];
$result = $conn->query("SHOW COLUMNS FROM $current_table");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $columns[] = $row['Field'];
    }
}

// Fetch data
$result = $conn->query("SELECT * FROM $current_table");

if ($result) {
    echo "<table border='1' cellpadding='5'>";
    echo "<tr>";
    foreach ($columns as $col) {
        echo "<th>$col</th>";
    }
    echo "<th>Actions</th>";
    echo "</tr>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        foreach ($columns as $col) {
            echo "<td>" . htmlspecialchars($row[$col]) . "</td>";
        }
        echo "<td>";
        echo "<button onclick=\"editRow('" . htmlspecialchars($row[$columns[0]]) . "')\">Edit</button> ";
        echo "<button onclick=\"deleteRow('" . htmlspecialchars($row[$columns[0]]) . "')\">Delete</button>";
        echo "</td>";
        echo "</tr>";
    }
    echo "</table>";

    // Populate column dropdown for ShowMax
    echo "<script>\n";
    echo "var select = document.getElementById('columnSelect');\n";
    echo "select.innerHTML = '<option value=\"\">Select a column</option>';\n";
    foreach ($columns as $col) {
        echo "var option = document.createElement('option');\n";
        echo "option.value = '$col';\n";
        echo "option.text = '$col';\n";
        echo "select.appendChild(option);\n";
    }
    echo "</script>\n";
} else {
    echo "Error loading data.";
}

$conn->close();
?>
