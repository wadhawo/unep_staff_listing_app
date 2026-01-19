-- CREATE DB
CREATE DATABASE unep_staff_db;
USE unep_staff_db;

-- Users table for login
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff table for personal information
CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    index_number VARCHAR(20) NOT NULL UNIQUE,
    full_names VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    current_location VARCHAR(100) NOT NULL,
    highest_level_of_education VARCHAR(50) NOT NULL,
    duty_station VARCHAR(50) NOT NULL,
    availability_for_remote_work VARCHAR(50),
    software_expertise VARCHAR(100),
    software_expertise_level VARCHAR(50),
    language VARCHAR(50),
    level_of_responsibility VARCHAR(50),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- INSERT INTIAL USER
INSERT INTO users (username, email, password_hash) VALUES ('walter.adhawo', 'wadhawo@gmail.com', '$2a$12$WCZXPLism8EnpcZH4//eCOAxfKLpocXQ0ceNpxO5y1v9ZMF6Ixctq');