-- Create the database
CREATE DATABASE timekeeping CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE timekeeping;

-- Time entries table
CREATE TABLE timesheet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  lunch_start TIME NOT NULL,
  lunch_end TIME NOT NULL,
  end_time TIME NOT NULL,
  pay_rate DECIMAL(10,2) NOT NULL
);

-- Payday records table
CREATE TABLE paydays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  payday_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL
);

-- Optional user auth table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);
