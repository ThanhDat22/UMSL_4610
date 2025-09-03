# University Database Management System

## 📌 Project Overview
This project was developed as part of **CS4610: Database Management Systems (Spring 2025)**.  
It implements a simple **University Database Management Web Application** using **PHP, MySQL, JavaScript, and CSS**.

The application allows users to:
- Insert new records into the university database
- Edit existing rows
- Delete rows (with undo functionality)
- Switch between tables dynamically
- Generate student transcripts
- Show maximum values for table columns using AJAX

The goal is to practice **basic SQL operations**, **AJAX requests**, and **web programming techniques**.

---

## 📂 Project Structure

```
.
├── index.php            # Main entry point, navigation between tables
├── enterTableRow.php    # Insert new rows into a table
├── getDataByRow.php     # Retrieve row data for editing
├── setDataByRow.php     # Update row values
├── delDataByRow.php     # Delete a row
├── undoDel.php          # Undo the most recent deletion
├── showMax.php          # Show maximum column values (AJAX)
├── transcript.php       # Generate transcript reports
├── style.css            # Styling for the UI
├── university.js        # JavaScript for AJAX and dynamic updates
└── universitydb.sql     # Database schema and sample data
```

---

## 🗄️ Database Schema
The project uses the **University Database** with the following tables:
- `student`
- `course`
- `mysection`
- `prerequisite`
- `grade_report`

Run the provided `universitydb.sql` script to create and initialize the database.

---

## ⚙️ Setup Instructions

### 1. Requirements
- **XAMPP / LAMP / WAMP** or any PHP + MySQL server
- Browser with JavaScript enabled

### 2. Installation
1. Place all project files inside your server’s root directory  
   (e.g., `htdocs/university_project/` in XAMPP).
2. Import the database:
   ```bash
   mysql -u root -p < universitydb.sql
   ```
3. Configure database connection inside your PHP files if needed (`localhost`, `root`, `password`, `universitydb`).

### 3. Run the Application
- Start Apache and MySQL in XAMPP/LAMP.
- Open your browser and navigate to:
  ```
  http://localhost/university_project/index.php
  ```

---

## 🚀 Features Implemented

- **Data Insertion**  
  Add new rows to any table via simple forms.

- **Table Switching**  
  Navigate between `student`, `course`, `grade_report`, etc. using links.

- **Row Editing**  
  Modify existing rows using AJAX (`getDataByRow.php` + `setDataByRow.php`).

- **Row Deletion + Undo**  
  Delete rows (`delDataByRow.php`) and recover mistakes using `undoDel.php`.

- **Transcript Report**  
  Auto-generate a transcript view with grades and courses (`transcript.php`).

- **Show Maximum Column Values**  
  Display max value of a selected column using AJAX (`showMax.php`).

- **Responsive UI**  
  Styled with `style.css` and interactive via `university.js`.

---

## 📸 Screenshots (Optional)
Add screenshots for:
- Home page with table navigation
- Insert/Edit/Delete rows
- Transcript report
- ShowMax feature in action

---

## ✨ Extra Credit (Optional)
- **Multi-row insertion** can be added for efficiency (not required).

---

## 👨‍💻 Author
- **Thanh Dat Nguyen**  
  University of Missouri–St. Louis  
  Course: CS4610 – Database Management Systems (Spring 2025)
