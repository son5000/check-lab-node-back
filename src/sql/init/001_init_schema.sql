-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS ud_converter CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ud_converter;

-- user 테이블
CREATE TABLE user (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_name VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  role ENUM('master','admin', 'user') DEFAULT 'user'
);

-- upload_history 테이블
CREATE TABLE upload_history (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36),
  file_name VARCHAR(255),
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_corrupted BOOLEAN,
  missing_files TEXT,
  mode VARCHAR(100),
  diagnosis_report_status ENUM('not_generated', 'generated'),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- parsed_data 테이블
CREATE TABLE parsed_data (
  id CHAR(36) PRIMARY KEY,
  upload_id CHAR(36),
  shift FLOAT,
  timestamp FLOAT,
  distance FLOAT,
  band FLOAT,
  volume FLOAT,
  avg FLOAT,
  peak FLOAT,
  hz FLOAT,
  gas BOOLEAN,
  uv_palette ENUM('A', 'B', 'C'),
  thermal_palette ENUM('blue-red', 'iron', 'rainbow'),
  thermal_min FLOAT,
  thermal_max FLOAT,
  thermal_maxpos VARCHAR(255),
  thermal_minpos VARCHAR(255),
  thermal_center VARCHAR(255),
  thermal_avg FLOAT,
  FOREIGN KEY (upload_id) REFERENCES upload_history(id)
);

-- detailed_report 테이블
CREATE TABLE detailed_report (
  id CHAR(36) PRIMARY KEY,
  upload_id CHAR(36),
  report_number VARCHAR(255),
  shooting_date DATETIME,
  mode VARCHAR(100),
  detected_db FLOAT,
  max_db FLOAT,
  pattern_temp FLOAT,
  avg_temp FLOAT,
  max_temp FLOAT,
  min_temp FLOAT,
  result TEXT,
  FOREIGN KEY (upload_id) REFERENCES upload_history(id)
);

-- report_images 테이블
CREATE TABLE report_images (
  id CHAR(36) PRIMARY KEY,
  report_id CHAR(36),
  image_type ENUM('thermal', 'uv', 'ultrasound'),
  image_path TEXT,
  FOREIGN KEY (report_id) REFERENCES detailed_report(id)
);

-- diagnosis_report 테이블
CREATE TABLE diagnosis_report (
  id CHAR(36) PRIMARY KEY,
  upload_id CHAR(36),
  facility_type VARCHAR(100),
  facility_name VARCHAR(255),
  part_name VARCHAR(255),
  building_name VARCHAR(255),
  floor VARCHAR(50),
  location VARCHAR(255),
  diagnosis_date DATE,
  ultrasound_power FLOAT,
  ir_min_temp FLOAT,
  ir_max_temp FLOAT,
  ir_avg_temp FLOAT,
  uv_detected BOOLEAN,
  fusion_result TEXT,
  distance FLOAT,
  ambient_temp FLOAT,
  equipment_used VARCHAR(255),
  serial_number VARCHAR(255),
  inspection_result TEXT,
  FOREIGN KEY (upload_id) REFERENCES upload_history(id)
);

-- thermal_click_points 테이블
CREATE TABLE thermal_click_points (
  id CHAR(36) PRIMARY KEY,
  image_id CHAR(36),
  point_label ENUM('L1', 'L2', 'L3'),
  x_coord FLOAT,
  y_coord FLOAT,
  temperature FLOAT,
  FOREIGN KEY (image_id) REFERENCES report_images(id)
);
