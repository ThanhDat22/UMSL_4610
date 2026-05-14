<?php
// setDataByRow.php

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
$primary_key = isset($_GET['id']) ? $_GET['id'] : '';

// Fetch columns
$columns = [];
$result = $conn->query("SHOW COLUMNS FROM $current_table");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $columns[] = $row['Field'];
    }
}

// Fetch existing record
$record = [];
if ($primary_key != '') {
    $pk_field = $columns[0]; // Assume first column is primary key
    $stmt = $conn->prepare("SELECT * FROM $current_table WHERE $pk_field = ?");
    $stmt->bind_param("s", $primary_key);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result && $result->num_rows > 0) {
        $record = $result->fetch_assoc();
    }
}

// Handle Update
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update'])) {
    $pk_field = $columns[0];
    $updates = [];

    foreach ($columns as $col) {
        if ($col == $pk_field) continue;
        $val = isset($_POST[$col]) ? $_POST[$col] : '';
        $updates[] = "$col='" . $conn->real_escape_string($val) . "'";
    }

    $update_sql = "UPDATE $current_table SET " . implode(", ", $updates) . " WHERE $pk_field='" . $conn->real_escape_string($primary_key) . "'";

    if ($conn->query($update_sql) === TRUE) {
        echo "<script>alert('Record updated successfully!'); window.location.href='index.php?table=$current_table';</script>";
        exit();
    } else {
        echo "Error updating record: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Record in <?php echo ucfirst($current_table); ?></title>
    <link rel="stylesheet" href="style.css">

</head>
<body>
    <h2>Edit Record in <?php echo ucfirst($current_table); ?></h2>
    <form method="post">
        <?php foreach ($columns as $col): ?>
            <?php if ($col == $columns[0]): ?>
                <?php echo $col; ?> (Primary Key): <input type="text" name="<?php echo $col; ?>" value="<?php echo htmlspecialchars($record[$col]); ?>" readonly><br>
            <?php else: ?>
                <?php echo $col; ?>: <input type="text" name="<?php echo $col; ?>" value="<?php echo htmlspecialchars($record[$col]); ?>"><br>
            <?php endif; ?>
        <?php endforeach; ?>
        <br>
        <input type="submit" name="update" value="Update">
    </form>
</body>
</html>

<?php
$conn->close();
?>
