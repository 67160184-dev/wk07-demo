-- wk07-schema.sql : Cafe POS (Brew Haven) - schema ฉบับสมบูรณ์ (3NF)
-- Import ซ้ำได้: ลบตารางเดิมก่อน (รวมตาราง orders แบบเก่าจาก Sprint 1)

CREATE DATABASE IF NOT EXISTS cafe_pos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cafe_pos;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS stock_movement;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_item;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS branch;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE category (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE branch (
  branch_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255)
);

-- Barista / Cashier / Manager รวมในตารางเดียว แยกชนิดด้วย role (single-table inheritance)
CREATE TABLE employee (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  branch_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL,
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);

-- แต่ละสาขามีแถวเมนูของตัวเอง เพราะ stock_quantity แยกต่อสาขา
CREATE TABLE menu_item (
  menu_id INT AUTO_INCREMENT PRIMARY KEY,
  branch_id INT NOT NULL,
  category_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT DEFAULT 0,
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id),
  FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- ไม่มี total_amount: ยอดรวมคำนวณจาก SUM(quantity * unit_price) ของ order_item
CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  branch_id INT NOT NULL,
  employee_id INT NOT NULL,
  payment_method VARCHAR(20) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

-- unit_price = snapshot ราคา ณ เวลาที่สั่ง (ไม่ใช่ข้อมูลซ้ำกับ menu_item.price)
CREATE TABLE order_item (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (menu_id) REFERENCES menu_item(menu_id)
);

CREATE TABLE stock_movement (
  movement_id INT AUTO_INCREMENT PRIMARY KEY,
  menu_id INT NOT NULL,
  quantity_change INT NOT NULL,
  moved_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (menu_id) REFERENCES menu_item(menu_id)
);
