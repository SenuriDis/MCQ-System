CREATE DATABASE IF NOT EXISTS mcq_system;
USE mcq_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT,
  question_text TEXT,
  option_a VARCHAR(255),
  option_b VARCHAR(255),
  option_c VARCHAR(255),
  option_d VARCHAR(255),
  correct_option CHAR(1),
  FOREIGN KEY (exam_id) REFERENCES exams(id)
);

CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  exam_id INT,
  score INT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  result_id INT,
  question_id INT,
  selected_option CHAR(1),
  is_correct BOOLEAN,
  FOREIGN KEY (result_id) REFERENCES results(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);
