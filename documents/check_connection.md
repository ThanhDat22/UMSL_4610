# **Troubleshooting MySQL Connection Issues**

The error "Failed to Connect to MySQL at 127.0.0.1:3306 with user root" suggests that MySQL Server is not running or there is a connection issue. Follow these steps to fix it:

## 1. Check If MySQL Server Is Running

Windows
    - Press `Win + R`, type `services.msc`, and press `Enter`.
    - Find `MySQL80` (or MySQL57, depending on your version).
    - If the status is Stopped, right-click and choose `Start`.
    - If running, restart it by right-clicking `Restart`.

Mac/Linux
    - Run this command in the terminal:

```bash
sudo systemctl restart mysql
```

or

```bash
sudo service mysql restart
```

## 2. Verify MySQL Port (3306)

Open Command Prompt and run:

```bash
netstat -ano | findstr :3306
```

- If no output appears, MySQL may not be listening on port 3306.
- Alternatively, check MySQL’s configuration file (my.cnf or my.ini) and confirm it’s set to listen on 3306.

## 3. Test Connection from Command Line

Try connecting manually:

```bash
mysql -u root -p
```

If this fails, reset the root password.

## 4. Reset MySQL Root Password

If you can't connect:

Stop MySQL:

```bash
sudo systemctl stop mysql
```

Start MySQL in safe mode:

```bash
sudo mysqld_safe --skip-grant-tables &
```

Connect to MySQL:

```bash
mysql -u root
```

Reset password:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
FLUSH PRIVILEGES;
```

Restart MySQL:

```bash
sudo systemctl restart mysql
```

## 5. Verify MySQL Workbench Settings

- Hostname: 127.0.0.1
- Port: 3306
- Username: root
- Password: Ensure it is correct.
- Click Test Connection and see if it works.