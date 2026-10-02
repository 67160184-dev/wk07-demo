const db = require("../config/db");

// Model ผูกกับตาราง orders และ order_item (field ตรงกับ column ใน schema.sql)
// conn = connection ที่อยู่ใน transaction (ถ้าไม่ส่ง จะใช้ pool ปกติ)

// orders: order_id, branch_id, employee_id, payment_method, created_at
exports.create = async ({ branchId, employeeId, paymentMethod }, conn = db) => {
  const [result] = await conn.query(
    "INSERT INTO orders (branch_id, employee_id, payment_method, created_at) VALUES (?, ?, ?, NOW())",
    [branchId, employeeId, paymentMethod],
  );
  return result.insertId;
};

// order_item: order_item_id, order_id, menu_id, quantity, unit_price
exports.addItem = async (orderId, menuId, quantity, unitPrice, conn = db) => {
  const [result] = await conn.query(
    "INSERT INTO order_item (order_id, menu_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
    [orderId, menuId, quantity, unitPrice],
  );
  return result.insertId;
};

// calculated_total ไม่ใช่ column: ยอดรวมไม่ได้เก็บใน orders แต่คำนวณสดจาก order_item
const SELECT_WITH_TOTAL = `
  SELECT o.order_id, o.branch_id, o.employee_id, o.payment_method, o.created_at,
         COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS calculated_total
  FROM orders o
  LEFT JOIN order_item oi ON oi.order_id = o.order_id`;

exports.findAll = async () => {
  const [rows] = await db.query(
    `${SELECT_WITH_TOTAL} GROUP BY o.order_id ORDER BY o.order_id`,
  );
  return rows;
};

exports.findById = async (orderId) => {
  const [rows] = await db.query(
    `${SELECT_WITH_TOTAL} WHERE o.order_id = ? GROUP BY o.order_id`,
    [orderId],
  );
  if (rows.length === 0) return null;

  const [items] = await db.query(
    "SELECT order_item_id, order_id, menu_id, quantity, unit_price FROM order_item WHERE order_id = ?",
    [orderId],
  );
  return { ...rows[0], items };
};
