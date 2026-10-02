const db = require("../config/db");

// Model ผูกกับตาราง menu_item
// column: menu_id, branch_id, category_id, name, price, stock_quantity

exports.findAll = async (branchId) => {
  const [rows] = await db.query(
    "SELECT menu_id, branch_id, category_id, name, price, stock_quantity FROM menu_item WHERE branch_id = ?",
    [branchId],
  );
  return rows;
};

exports.findById = async (menuId, conn = db) => {
  const [rows] = await conn.query(
    "SELECT menu_id, branch_id, category_id, name, price, stock_quantity FROM menu_item WHERE menu_id = ?",
    [menuId],
  );
  return rows[0] || null;
};

exports.create = async ({ branchId, categoryId, name, price, stockQuantity = 0 }) => {
  const [result] = await db.query(
    "INSERT INTO menu_item (branch_id, category_id, name, price, stock_quantity) VALUES (?, ?, ?, ?, ?)",
    [branchId, categoryId, name, price, stockQuantity],
  );
  return result.insertId;
};

exports.updatePrice = async (menuId, price) => {
  const [result] = await db.query(
    "UPDATE menu_item SET price = ? WHERE menu_id = ?",
    [price, menuId],
  );
  return result.affectedRows > 0;
};
