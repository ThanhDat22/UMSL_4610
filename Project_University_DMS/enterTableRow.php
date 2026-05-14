<?php
// enterTableRow.php


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

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['insert'])) {
    $numRows = intval($_POST['numRows']);
    $valuesList = [];

    for ($i = 0; $i < $numRows; $i++) {
        $rowValues = [];
        foreach ($columns as $col) {
            $val = isset($_POST[$col][$i]) ? $_POST[$col][$i] : '';
            $rowValues[] = "'" . $conn->real_escape_string($val) . "'";
        }
        $valuesList[] = "(" . implode(",", $rowValues) . ")";
    }

    $sql = "INSERT INTO $current_table (" . implode(",", $columns) . ") VALUES " . implode(",", $valuesList);

    if ($conn->query($sql) === TRUE) {
        echo "<script>window.location.href='enterTableRow.php?table=$current_table';</script>";
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}

// Pagination setup
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$records_per_page = 10;
$offset = ($page - 1) * $records_per_page;

// Fetch data for display
$data = [];
$result = $conn->query("SELECT * FROM $current_table LIMIT $offset, $records_per_page");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Count total records
$total_result = $conn->query("SELECT COUNT(*) AS total FROM $current_table");
$total_row = $total_result->fetch_assoc();
$total_records = $total_row['total'];
$total_pages = ceil($total_records / $records_per_page);
?>

<!DOCTYPE html>
<html>
<head>
<head>
    <title>Insert into <?php echo ucfirst($current_table); ?></title>
    <link rel="stylesheet" href="style.css">
</head>
    <!-- Home Button -->
    <div style="margin-bottom: 15px;">
    <a href="index.php">
        <button type="button">Home</button>
    </a>
    </div>
    
    <h2>Insert into <?php echo ucfirst($current_table); ?></h2>
    <form method="post">
        Number of Rows to Insert (1-6): <input type="number" name="numRows" min="1" max="6" value="1" onchange="generateRows(this.value)"><br><br>

        <div id="inputArea">
            <?php foreach ($columns as $col): ?>
                <?php echo $col; ?>: <input type="text" name="<?php echo $col; ?>[0]"><br>
            <?php endforeach; ?>
        </div>

        <br>
        <input type="submit" name="insert" value="Insert">
    </form>

    

    <h2>Existing Records</h2>
    <table border="1" cellpadding="5">
        <tr>
            <?php foreach ($columns as $col): ?>
                <th><?php echo $col; ?></th>
            <?php endforeach; ?>
        </tr>
        <?php foreach ($data as $row): ?>
            <tr>
                <?php foreach ($columns as $col): ?>
                    <td><?php echo htmlspecialchars($row[$col]); ?></td>
                <?php endforeach; ?>
            </tr>
        <?php endforeach; ?>
    </table>

    <div style="margin-top: 20px;">
        <?php if ($page > 1): ?>
            <a href="?table=<?php echo $current_table; ?>&page=<?php echo $page - 1; ?>">Previous</a>
        <?php endif; ?>

        <?php if ($page < $total_pages): ?>
            <a href="?table=<?php echo $current_table; ?>&page=<?php echo $page + 1; ?>">Next</a>
        <?php endif; ?>
    </div>

    

    <script>
    function generateRows(num) {
        var area = document.getElementById('inputArea');
        var columns = <?php echo json_encode($columns); ?>;
        let html = '';

        for (let i = 0; i < num; i++) {
            columns.forEach(function(col) {
                html += col + ': <input type="text" name="' + col + '[' + i + ']"> <br>';
            });
            html += '<br>';
        }

        area.innerHTML = html;
    }
    </script>
</body>
</html>

<?php
$conn->close();
?>