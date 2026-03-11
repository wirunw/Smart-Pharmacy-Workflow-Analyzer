# 🏪 Smart Pharmacy Workflow Analyzer

เครื่องมือวิเคราะห์งานประจำวันของเภสัชกร เพื่อระบุคอขวด (Bottlenecks) และประเมินศักยภาพในการใช้ RPA (Robotic Process Automation)

## 📋 ภาพรวม (Overview)

แอปพลิเคชันนี้ถูกพัฒนาขึ้นเพื่อการวิจัยทางวิชาการ โดยมีวัตถุประสงค์เพื่อ:

- เก็บข้อมูลกิจกรรมรายวันของเภสัชกรในร้านยาชุมชน
- วิเคราะห์คอขวดใน workflow ประจำวัน
- ประเมินงานที่มีศักยภาพสูงในการใช้ RPA แทนที่
- รักษาความเป็นส่วนตัวและความน่าเชื่อถือของข้อมูล

## ✨ คุณสมบัติหลัก (Key Features)

### 1. ระบบสมาชิก (Netlify Identity)
- ✅ ลงทะเบียนและเข้าสู่ระบบด้วย Google Login
- ✅ จัดการสิทธิ์การเข้าถึงข้อมูล (User กับ Admin)
- ✅ ติดตามผลการบันทึกข้อมูลแยกตามบุคคล
- ✅ รักษาความเป็นส่วนตัวของข้อมูล

### 2. บันทึกงานประจำวัน (Daily Workflow Log)
บันทึกเวลาและกิจกรรมต่อไปนี้:
- คีย์ข้อมูลประกันสุขภาพ
- ทำบัญชีขย. 9-11 (ยาเสพติด)
- เช็คสต็อกยา
- รับ-จ่ายยา
- ให้คำปรึกษา
- ทำงานเอกสาร/รายงาน
- ประชุม/อบรม
- งานอื่นๆ

### 3. ประเมินความเหมาะสมในการใช้ RPA (RPA Assessment)
ประเมินงานตามเกณฑ์ 7 ด้าน:
- Rule-based (มีกฎเกณฑ์ที่ชัดเจน)
- Repetitive (ซ้ำซากแบบเดิม)
- Standardized Process (ขั้นตอนเป็นลำดับ)
- Structured Data (ใช้ข้อมูลที่เป็นระบบ)
- Minimal Decision Making (ไม่ต้องการการตัดสินใจซับซ้อน)
- Computer-based (ใช้โปรแกรมคอมพิวเตอร์)
- High Volume (ปริมาณสูง)

### 4. Dashboard (สำหรับ Admin)
- ดูภาพรวมข้อมูลทั้งหมด
- ระบุงานที่มีศักยภาพสูงในการใช้ RPA
- ระบุกิจกรรมที่เป็นคอขวด
- สรุปสถิติและเวลาเฉลี่ย
- Export ข้อมูลเป็น CSV

## 🚀 เริ่มต้นใช้งาน (Getting Started)

### สำหรับผู้ใช้งานทั่วไป (เภสัชกร)

1. เข้าสู่ระบบด้วย Google Account
2. ไปที่ "บันทึกงานประจำวัน" เพื่อบันทึกกิจกรรมรายวัน
3. ไปที่ "ประเมิน RPA" เพื่อประเมินงานที่คิดว่าน่าใช้ RPA

### สำหรับ Admin (ผู้วิจัย)

1. เข้าสู่ระบบด้วยอีเมลที่ลงทะเบียนเป็น Admin
2. ดู Dashboard เพื่อวิเคราะห์ข้อมูล
3. Export ข้อมูลจาก Netlify เพื่อนำไปวิเคราะห์เพิ่มเติม
4. สรุปผลการวิจัย

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
WebForm/
├── index.html          # หน้าหลักและระบบ navigation
├── styles.css          # สไตล์และ responsive design
├── app.js              # JavaScript สำหรับการทำงาน
├── netlify.toml        # การตั้งค่า Netlify
└── README.md           # เอกสารประกอบ
```

## 🔧 การติดตั้งและการใช้งาน (Installation & Usage)

### 1. Clone โปรเจกต์

```bash
git clone <your-repository-url>
cd WebForm
```

### 2. ทดสอบในเครื่อง (Local Development)

#### ติดตั้ง Netlify CLI

```bash
npm install -g netlify-cli
```

#### เริ่ม Local Server

```bash
netlify dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:8080`

### 3. Deploy ไป Netlify

#### วิธีที่ 1: Deploy ผ่าน Netlify CLI

```bash
netlify login
netlify init
netlify deploy --prod
```

#### วิธีที่ 2: Deploy ผ่าน Git

1. Push โค้ดไป GitHub/GitLab/Bitbucket
2. ไปที่ Netlify Dashboard
3. กด "New site from Git"
4. เลือก repository และกด Deploy

## ⚙️ การตั้งค่า Netlify (Netlify Configuration)

### 1. เปิดใช้งาน Netlify Identity

1. ไปที่ Netlify Dashboard
2. เลือก Site > Identity
3. กด "Enable Identity"
4. ตั้งค่า Providers:
   - ✅ Google (แนะนำ)
   - ✅ Email/Password
5. กด "Enable Git Gateway" (ถ้าต้องการ)

### 2. ตั้งค่า Forms

Forms จะถูกตรวจจับอัตโนมัติจาก HTML ที่มี `data-netlify="true"`

1. ไปที่ Site > Forms
2. Forms จะปรากฏหลังจากส่งครั้งแรก

### 3. ตั้งค่า Notifications

1. ไปที่ Site > Forms > (เลือก Form) > Settings & notifications
2. เพิ่ม Email/Slack notification เมื่อมีข้อมูลใหม่

### 4. ตั้งค่า Admin

แก้ไขไฟล์ `app.js`:

```javascript
const adminEmails = ['virun@example.com', 'admin@example.com']; // เปลี่ยนเป็นอีเมลของ Admin
```

### 5. ตั้งค่า Environment Variables

ไปที่ Site > Settings > Environment variables:

- `NETLIFY_SITE_ID`: Site ID ของคุณ
- `NETLIFY_AUTH_TOKEN`: Auth token ของคุณ

## 🔐 ความปลอดภัย (Security)

- ✅ HTTPS ทั้งหมด (ให้โดย Netlify)
- ✅ Netlify Identity สำหรับการจัดการสมาชิก
- ✅ Role-based access control
- ✅ Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- ✅ ข้อมูลผู้ใช้งานถูกแยกตามบุคคล

## 📊 การจัดการข้อมูล (Data Management)

### Export ข้อมูล

1. ไปที่ Netlify Dashboard > Site > Forms
2. เลือก Form ที่ต้องการ
3. กด "Download CSV" เพื่อดาวน์โหลดข้อมูล

### การวิเคราะห์ข้อมูล

ข้อมูลที่ได้สามารถนำไป:
- วิเคราะห์ด้วย Excel/Google Sheets
- สร้างกราฟและสถิติ
- ทำรายงานวิจัย
- เชื่อมต่อกับ Netlify Functions สำหรับ Real-time Dashboard

## 🌐 API และ Integration

### Netlify Forms API

ข้อมูลถูกส่งโดยตรงไปยัง Netlify Forms โดยอัตโนมัติ

### ตัวอย่างการใช้ Netlify Functions

สร้างไฟล์ `netlify/functions/get-submissions.js`:

```javascript
exports.handler = async (event, context) => {
  // เชื่อมต่อกับ Netlify Forms API
  // ดึงข้อมูลและส่งกลับเป็น JSON
};
```

## 📱 Responsive Design

แอปพลิเคชันรองรับ:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## 🤝 การสนับสนุน (Support)

หากพบปัญหาหรือมีข้อเสนอแนะ:
- สร้าง Issue ใน GitHub repository
- ติดต่อผู้วิจัยโดยตรง

## 📄 ใบอนุญาต (License)

โปรเจกต์นี้ถูกพัฒนาเพื่อการวิจัยทางวิชาการ

## 👥 ทีมพัฒนา (Development Team)

- ผู้วิจัยหลัก: คุณวิรุณ
- พัฒนาโดย: Cline AI Assistant

## 📝 เอกสารอ้างอิง (References)

- [Netlify Identity Documentation](https://docs.netlify.com/identity/)
- [Netlify Forms Documentation](https://docs.netlify.com/forms/)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/)

## 🔄 อัปเดตล่าสุด (Latest Updates)

- ✅ สร้างโครงสร้างโปรเจกต์พื้นฐาน
- ✅ พัฒนาหน้า HTML ทั้งหมด
- ✅ เพิ่ม CSS และ Responsive Design
- ✅ ติดตั้ง Netlify Identity
- ✅ ติดตั้ง Netlify Forms
- ✅ พัฒนา JavaScript สำหรับการทำงาน
- ✅ สร้าง Dashboard สำหรับ Admin
- ✅ เพิ่มการตรวจสอบและ validation

## 🚧 แผนการพัฒนาต่อไป (Future Enhancements)

- [ ] เพิ่ม Netlify Functions สำหรับ Real-time Dashboard
- [ ] เชื่อมต่อกับ Google Sheets อัตโนมัติ
- [ ] เพิ่มกราฟและการ visualise ข้อมูล
- [ ] สร้างระบบแจ้งเตือนผ่าน Email/Slack
- [ ] เพิ่มระบบส่งออกรายงาน
- [ ] พัฒนา Mobile App (React Native)

---

**หมายเหตุ:** โปรเจกต์นี้อยู่ระหว่างการพัฒนาและการทดสอบ สามารถใช้งานได้แต่อาจมีการปรับปรุงเพิ่มเติมในอนาคต