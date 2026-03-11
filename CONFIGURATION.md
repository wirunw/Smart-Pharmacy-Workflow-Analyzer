# ⚙️ คู่มือการตั้งค่าแอปพลิเคชัน

คู่มือนี้จะอธิบายสิ่งที่ต้องตั้งค่าก่อนเริ่มใช้งาน

## 📝 การตั้งค่าที่จำเป็น (Required Configuration)

### 1. ตั้งค่า Admin Email

แก้ไขไฟล์ `app.js` บรรทัดที่ 215:

```javascript
const adminEmails = ['virun@example.com', 'admin@example.com']; // เปลี่ยนเป็นอีเมลของ Admin
```

**วิธีแก้ไข:**
1. เปิดไฟล์ `app.js`
2. ค้นหา `adminEmails`
3. เปลี่ยนอีเมลใน array เป็นอีเมลของ Admin จริง
4. บันทึกไฟล์

**ตัวอย่าง:**
```javascript
const adminEmails = ['your.email@domain.com']; // ใส่อีเมลของคุณ
```

### 2. ตั้งค่า Netlify Site Name (ถ้าจำเป็น)

ในไฟล์ `app.js` บรรทัดที่ 280:

```javascript
<a href="https://app.netlify.com/sites/YOUR_SITE_NAME/forms" target="_blank">
```

**วิธีแก้ไข:**
1. หลังจาก Deploy แล้ว จะได้ URL เช่น `https://pharmacy-workflow.netlify.app`
2. นำส่วน `pharmacy-workflow` มาใช้
3. แก้ไขเป็น:

```javascript
<a href="https://app.netlify.com/sites/pharmacy-workflow/forms" target="_blank">
```

## 🔧 การตั้งค่าเพิ่มเติม (Optional Configuration)

### 3. เปลี่ยนชื่อแอปพลิเคชัน

**ใน `index.html`:**
- บรรทัดที่ 10: `<title>Smart Pharmacy Workflow Analyzer</title>`
- บรรทัดที่ 20: `<h1>🏪 Smart Pharmacy Workflow Analyzer</h1>`
- บรรทัดที่ 21: `<p class="subtitle">เครื่องมือวิเคราะห์งานประจำวันของเภสัชกร</p>`

**ใน `README.md`:**
- บรรทัดที่ 1: `# 🏪 Smart Pharmacy Workflow Analyzer`

### 4. เปลี่ยนสีหลัก (Theme Colors)

**ใน `styles.css`:**

```css
:root {
    --primary-color: #2563eb;      /* เปลี่ยนสีหลัก */
    --secondary-color: #64748b;    /* เปลี่ยนสีรอง */
    --success-color: #10b981;     /* เปลี่ยนสีสำเร็จ */
    --danger-color: #ef4444;      /* เปลี่ยนสีอันตราย */
    --warning-color: #f59e0b;     /* เปลี่ยนสีเตือน */
}
```

**ตัวอย่างสีที่ใช้ได้:**
- Primary: `#2563eb` (Blue), `#7c3aed` (Purple), `#059669` (Green)
- Success: `#10b981` (Green), `#0891b2` (Cyan)
- Danger: `#ef4444` (Red), `#dc2626` (Dark Red)

### 5. ปรับกิจกรรมใน Daily Log

**ใน `index.html`:** ปรับรายการกิจกรรมในส่วน `activities-section`

**ตัวอย่างการเพิ่มกิจกรรมใหม่:**

```html
<div class="activity-item">
    <label>9. ชื่อกิจกรรมใหม่</label>
    <input type="number" name="new-activity" min="0" placeholder="0">
    <small>รายละเอียดกิจกรรม</small>
</div>
```

### 6. ปรับคำถามใน RPA Assessment

**ใน `index.html`:** ปรับคำถามในส่วน `assessment-questions`

**ตัวอย่างการเพิ่มคำถามใหม่:**

```html
<div class="question-item">
    <label>8. คำถามใหม่</label>
    <div class="rating">
        <label><input type="radio" name="new-question" value="1" required> 1</label>
        <label><input type="radio" name="new-question" value="2"> 2</label>
        <label><input type="radio" name="new-question" value="3"> 3</label>
        <label><input type="radio" name="new-question" value="4"> 4</label>
        <label><input type="radio" name="new-question" value="5"> 5</label>
    </div>
</div>
```

## 🔐 การตั้งค่าความปลอดภัย (Security Settings)

### 7. เปลี่ยน Security Headers (ถ้าจำเป็น)

**ใน `netlify.toml`:**

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

### 8. ตั้งค่า Password Protection (ถ้าจำเป็น)

ใช้ Netlify Dashboard เพื่อตั้งรหัสผ่านสำหรับทั้ง site:

1. Site > Site settings > Change site password
2. ตั้งรหัสผ่าน
3. กด Save

## 📊 การตั้งค่า Dashboard Data (Optional)

### 9. ปรับ Sample Data ใน Dashboard

**ใน `app.js`:** ฟังก์ชัน `loadDashboardData()` บรรทัดที่ 300+

```javascript
const sampleData = {
    totalLogs: 45,
    totalRPA: 23,
    totalUsers: 12,
    avgTime: 385,
    highRPATasks: [
        { task: 'คีย์ข้อมูลประกันสุขภาพ', score: 4.8, count: 12 },
        { task: 'ทำบัญชีขย. 9-11', score: 4.5, count: 8 },
        { task: 'ทำรายงานประจำวัน', score: 4.3, count: 10 },
    ],
    bottlenecks: [
        { task: 'คีย์ข้อมูลประกันสุขภาพ', avgMinutes: 120 },
        { task: 'รับ-จ่ายยา', avgMinutes: 180 },
        { task: 'ทำบัญชีขย. 9-11', avgMinutes: 45 },
    ]
};
```

**หมายเหตุ:** นี่คือข้อมูลตัวอย่าง ควรเชื่อมต่อกับ Netlify Functions หรือ API จริงเพื่อดึงข้อมูลจริง

## 🌐 การตั้งค่า Multi-language (ถ้าจำเป็น)

### 10. เพิ่มภาษาอังกฤษ

ถ้าต้องการรองรับหลายภาษา สามารถ:

1. สร้างไฟล์ภาษาแยก (เช่น `en.json`, `th.json`)
2. ใช้ JavaScript เพื่อโหลดภาษาตามที่เลือก
3. อัปเดต HTML ให้ใช้ translations

## 📱 การตั้งค่า Mobile (Optional)

### 11. เพิ่ม PWA Support

สร้างไฟล์ `manifest.json`:

```json
{
  "name": "Smart Pharmacy Workflow Analyzer",
  "short_name": "Pharmacy Workflow",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f8fafc",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

เพิ่มใน `index.html`:

```html
<link rel="manifest" href="manifest.json">
```

## ✅ Checklist ก่อน Deploy

- [ ] ตั้งค่า Admin email ใน `app.js`
- [ ] ตั้งค่า Netlify site name ใน `app.js` (ถ้าจำเป็น)
- [ ] ทดสอบทุกฟังก์ชันใน local
- [ ] ตรวจสอบ responsive design
- [ ] ตรวจสอบ accessibility
- [ ] อัปเดต README ด้วยข้อมูลที่ถูกต้อง
- [ ] Commit และ push ไป Git

## 🚀 ขั้นตอนถัดไป

หลังจากตั้งค่าเสร็จแล้ว:

1. อ่าน [DEPLOYMENT.md](DEPLOYMENT.md) เพื่อ Deploy ไป Netlify
2. ตั้งค่า Netlify Identity และ Forms
3. ทดสอบทุกฟังก์ชันใน production
4. เชิญผู้ใช้งานเข้าระบบ

## 💡 เคล็ดลับ

1. **ทดสอบก่อน Deploy:** ใช้ `netlify dev` เพื่อทดสอบใน local
2. **Backup ข้อมูล:** Export ข้อมูลจาก Netlify Forms เป็นประจำ
3. **Monitor Analytics:** ติดตามการใช้งานผ่าน Netlify Analytics
4. **อัปเดตอย่างสม่ำเสมอ:** อัปเดตแอปพลิเคชันเพื่อปรับปรุงฟังก์ชัน

## 🆘 ต้องการความช่วยเหลือ?

หากมีคำถามหรือปัญหา:

- ดู [README.md](README.md) สำหรับข้อมูลทั่วไป
- ดู [DEPLOYMENT.md](DEPLOYMENT.md) สำหรับคู่มือการ Deploy
- ติดต่อผู้วิจัยโดยตรง

---

**หมายเหตุ:** การตั้งค่าทั้งหมดนี้เป็นการปรับแต่งตามความต้องการ แอปพลิเคชันสามารถใช้งานได้โดยไม่ต้องปรับเปลี่ยน