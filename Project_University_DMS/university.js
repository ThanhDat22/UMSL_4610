// university.js

function editRow(id) {
    var table = new URLSearchParams(window.location.search).get('table');
    if (!table) {
        table = 'student'; // Default if missing
    }
    window.location.href = 'setDataByRow.php?table=' + table + '&id=' + id;
}

function deleteRow(id) {
    var table = new URLSearchParams(window.location.search).get('table');
    if (!table) {
        table = 'student';
    }
    if (confirm("Are you sure you want to delete this record?")) {
        window.location.href = 'delDataByRow.php?table=' + table + '&id=' + id;
    }
}

function showMaxValue() {
    var column = document.getElementById('columnSelect').value;
    var table = new URLSearchParams(window.location.search).get('table');
    if (!table) {
        table = 'student';
    }
    if (column) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'showMax.php?table=' + table + '&column=' + column, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById('maxResult').innerHTML = xhr.responseText;
            }
        };
        xhr.send();
    } else {
        alert('Please select a column first!');
    }
}
