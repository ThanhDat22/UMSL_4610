<?php
// index.php
// Main Page

// List of tables
$tables = ['course', 'grade_report', 'mysection', 'prerequisite', 'student'];

// Get current table from URL, default to 'student'
$current_table = isset($_GET['table']) ? $_GET['table'] : 'student';
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>University Database Management</title>
    <script src="university.js"></script>
    <link rel="stylesheet" href="style.css">


</head>
<body>
    <h1>University Database Management</h1>

    <!-- Navigation Links -->
    <nav>
        <?php foreach ($tables as $table): ?>
            <a href="index.php?table=<?php echo $table; ?>">
                <?php echo ucfirst($table); ?>
            </a> |
        <?php endforeach; ?>
    </nav>

    <br>

    

    <!-- Top Buttons -->
    <div style="margin-bottom:20px;">
        <button onclick="window.location.href='transcript.php'">Transcript</button>
        <select id="columnSelect">
            <option value="">Select a column</option>
        </select>
        <button onclick="showMaxValue()">Show Max</button>
        <button onclick="window.location.href='undoDelete.php'">Undo Delete</button>
        <button onclick="window.location.href='enterTableRow.php?table=<?php echo $current_table; ?>'">Add New</button>

        <div id="maxResult" style="margin-top:10px; border:1px solid gray; width:200px; padding:5px;">Max Value Here</div>
    </div>

    <!-- Display Table -->
    <div id="dataTable">
        <?php include 'getDataByRow.php'; ?>
    </div>

</body>
</html>
