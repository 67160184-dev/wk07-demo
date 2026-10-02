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
