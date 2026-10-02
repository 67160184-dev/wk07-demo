## การใช้ AI ในงานนี้ (AI Usage Declaration) — Workshop สัปดาห์ที่ 7

### 1. ใช้ AI หรือไม่?

- [ ] ไม่ได้ใช้ AI
- [x] ใช้ AI

**รายละเอียด:** Workshop ครั้งนี้ผมใช้ Claude (Claude Code) เป็นผู้ช่วยหลักครับ โดยให้มันอ่านโจทย์ (`wk07.md`, rubric, case study และ Class Diagram ของ wk06) แล้วสรุปให้ก่อนว่าต้องส่งอะไรบ้าง จากนั้นผมสั่งให้ลงมือทำตามขั้นตอนใน Workshop ทั้ง 7 ข้อ

ส่วนที่ให้ AI ช่วยร่างให้ คือ
- ER Diagram (`wk07-er-diagram.png`) กับ `wk07-schema.sql`
- Model 2 ตัว (`menuModel.js`, `orderModel.js`) และการแก้โค้ด Sprint 1 ใน repo ให้ใช้ schema ใหม่ ตามขั้นตอนที่ 5 (`schema.sql`, `orderController.js`, `README.md`)
- ทดสอบ import schema (2 รอบ) และยิง API ผ่าน MySQL ใน Docker แล้วลบ container ทดสอบทิ้ง
- แก้ชื่อเส้นความสัมพันธ์ในรูป ER Diagram เป็นภาษาไทย

ส่วนที่ผมคุมเอง คือสั่งว่าจะทำอะไรและเรียงลำดับยังไง สั่งให้ตรวจเทียบกับ `wk07.md` และ rubric และตัดสินใจเองว่าให้ตัดส่วนที่เกินจากโจทย์ออก (ข้อมูลจำลอง, ฟังก์ชัน Model ที่ไม่จำเป็น, route ที่เพิ่มเอง)

### 2. เครื่องมือ AI ที่ใช้:

- Claude (Claude Code)

### 3. งานส่วนไหนใช้ AI:

- [ ] Requirement Analysis - ส่วน: -
- [x] Database Design - ส่วน: ร่าง ER Diagram (`wk07-er-diagram.png`) และ `wk07-schema.sql`
- [ ] System Architecture - ส่วน: -
- [] Document/Grammar Check - ส่วน: -
- [x] อื่นๆ: เขียน `menuModel.js`, `orderModel.js` และปรับ `orderController.js`, `README.md` ของ Sprint 1 ให้ตรง schema ใหม่ รวมทั้งทดสอบ import schema และ API กับ MySQL 8.0 (Docker)

### 4. Prompt ที่ใช้ (ตัวอย่าง):

```
"ช่วยทำ workshop หน่อย สรุปก่อนนะว่าต้องทำอะไรส่งบ้าง รอผมสั่ง"
"ดู workshop เป็นหลักครับ" (ให้ทำตามขั้นตอนใน wk07.md )
"ช่วยตรวจสอบอีกทีว่าตรงตามที่ wk07.md กับ wk07-rubric.md กำหนดมั้ย"
"เอาส่วนที่เกินออกแล้วตรวจสอบให้ดีว่าตรงกับที่สั่งใน workshop"
"wk07-er-diagram.png แก้เป็นภาษาไทยได้มั้ยแค่ตรงเส้น"
```

### 5. ผลลัพธ์จาก AI:

AI สรุปงานที่ต้องส่ง แล้วร่าง ER Diagram (7 ตาราง: branch, employee, category, menu_item, orders, order_item, stock_movement), `wk07-schema.sql`, Model 2 ตัว และเอกสารงานเดี่ยว จากนั้นแก้โค้ด Sprint 1 ให้ใช้ schema ใหม่ (เปลี่ยน PK เป็น `order_id`, ตัด `total_amount`, บันทึก `order_item` ใน transaction, ดึงราคาจาก `menu_item`) และทดสอบ import schema ได้โดยไม่มี error จากนั้นตัดส่วนที่เกินจากโจทย์ออกตามที่สั่ง (ข้อมูลจำลองใน schema, `create`/`updatePrice` ใน `menuModel.js`, `GET /api/orders/:id`) และทดสอบซ้ำ

### 6. การปรับแต่งของนิสิตเอง:

"ผมให้ AI ตรวจงานเทียบกับ `wk07.md` และ rubric อีกรอบ ซึ่งพบว่า alias `total_amount` ใน `orderModel.js` ไม่ตรงกับ schema จึงเปลี่ยนเป็น `calculated_total` และสั่งให้ทดสอบ import กับยิง API ใน Docker ก่อนส่ง

ผมเข้าใจว่า ER Diagram ไม่มี method จึงไม่เก็บ `total_amount` (คำนวณจาก `SUM(quantity * unit_price)`), M:N ของ Order กับ MenuItem ต้องมี `order_item` และ `unit_price` ต้องเก็บเป็นราคา ณ ตอนสั่ง"

### 7. เหตุผลในการใช้ AI:

"ใช้ AI ช่วยร่าง SQL, ER Diagram และ Model "
