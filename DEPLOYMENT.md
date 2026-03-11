# 🚀 คู่มือการ Deploy ไป Netlify

คู่มือนี้จะอธิบายขั้นตอนการ Deploy แอปพลิเคชัน Smart Pharmacy Workflow Analyzer ไปยัง Netlify

## 📋 ขั้นตอนก่อนการ Deploy

### 1. ตรวจสอบไฟล์ที่จำเป็น

ตรวจสอบว่ามีไฟล์ต่อไปนี้ในโปรเจกต์:

```
WebForm/
├── index.html          ✅
├── styles.css          ✅
├── app.js              ✅
├── netlify.toml        ✅
├── README.md           ✅
└── DEPLOYMENT.md       ✅
```

### 2. เตรียม Git Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Smart Pharmacy Workflow Analyzer"

# Connect to remote repository (GitHub/GitLab/Bitbucket)
git remote add origin <your-repository-url>
git branch -M main
git push -u origin main
```

## 🌐 การ Deploy ไป Netlify

### วิธีที่ 1: Deploy ผ่าน Netlify Dashboard (แนะนำ)

#### Step 1: สร้างบัญชี Netlify

1. ไปที่ [https://www.netlify.com](https://www.netlify.com)
2. กด "Sign up" และลงทะเบียน (สามารถใช้ GitHub, GitLab, Bitbucket หรือ Email)

#### Step 2: สร้าง Site ใหม่

1. หลังจาก Login แล้ว กด "New site from Git"
2. เลือก Git provider ที่คุณใช้ (GitHub/GitLab/Bitbucket)
3. กด "Configure Netlify on GitHub/GitLab/Bitbucket"
4. Authorize Netlify เพื่อเข้าถึง repository

#### Step 3: เลือก Repository

1. เลือก repository `WebForm` ของคุณ
2. ตั้งค่า Build settings:
   - **Build command:** (ปล่อยว่าง)
   - **Publish directory:** `.`
   - **Branch to deploy:** `main`
3. กด "Deploy site"

#### Step 4: รอการ Deploy

- Netlify จะทำการ Deploy ใช้เวลาประมาณ 1-2 นาที
- เมื่อสำเร็จ จะได้ URL เช่น `https://your-site-name.netlify.app`

### วิธีที่ 2: Deploy ผ่าน Netlify CLI

#### Step 1: ติดตั้ง Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Login ไป Netlify

```bash
netlify login
```

#### Step 3: Initialize และ Deploy

```bash
# Initialize
netlify init

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

### วิธีที่ 3: Deploy ผ่าน Drag & Drop

1. ไปที่ [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop โฟลเดอร์ `WebForm` ลงไป
3. รอการ Deploy และจะได้ URL ทันที

## ⚙️ การตั้งค่า Netlify Identity

### 1. เปิดใช้งาน Netlify Identity

1. ไปที่ Netlify Dashboard
2. เลือก Site > **Identity**
3. กดปุ่ม **"Enable Identity"**

### 2. ตั้งค่า Authentication Providers

1. ในหน้า Identity กด **"Settings"**
2. ในส่วน **External providers**:
   - **Google:** กด "Enable" และตั้งค่าตามคำแนะนำ
   - **Email:** กด "Enable" ถ้าต้องการให้ใช้ Email/Password
3. ในส่วน **Registration**:
   - **Registration preferences:** เลือก "Open registration" เพื่อให้ลงทะเบียนได้เอง
4. กด **"Save"**

### 3. ตั้งค่า User Roles (ถ้าจำเป็น)

1. ในหน้า Identity กด **"Users"**
2. สามารถเพิ่ม User หรือแก้ไข Role ได้
3. สำหรับ Admin ให้กดที่ User และเลือก **"Invite as admin"**

### 4. ตั้งค่า Git Gateway (ถ้าจำเป็น)

1. ในหน้า Identity กด **"Settings"**
2. เลื่อนลงมาที่ **Git gateway**
3. กด **"Enable Git gateway"**
4. ตั้งค่า **Default role** และ **Allowed roles**

## 📝 การตั้งค่า Netlify Forms

### 1. Forms จะถูกสร้างอัตโนมัติ

Forms จะถูกตรวจจับอัตโนมัติจาก HTML ที่มี `data-netlify="true"`:

```html
<form name="workflow-log" method="POST" data-netlify="true">
```

### 2. ตรวจสอบ Forms

1. ไปที่ Netlify Dashboard > Site > **Forms**
2. Forms จะปรากฏหลังจากมีการส่งข้อมูลครั้งแรก
3. คุณจะเห็น Forms ต่อไปนี้:
   - `workflow-log` (บันทึกงานประจำวัน)
   - `rpa-assessment` (ประเมิน RPA)

### 3. ตั้งค่า Notifications

1. เลือก Form ที่ต้องการ (เช่น `workflow-log`)
2. กด **"Settings & notifications"**
3. ในส่วน **Form notifications** กด **"Add notification"**
4. เลือกประเภท:
   - **Email notification:** กรอกอีเมลที่ต้องการให้แจ้งเตือน
   - **Slack notification:** เชื่อมต่อกับ Slack workspace
5. กด **"Save notification"**

### 4. Export ข้อมูล

1. เลือก Form ที่ต้องการ
2. กดปุ่ม **"Download CSV"**
3. ไฟล์ CSV จะถูกดาวน์โหลดและสามารถนำไปเปิดด้วย Excel หรือ Google Sheets

## 🔧 การตั้งค่า Environment Variables

### 1. เพิ่ม Environment Variables

1. ไปที่ Netlify Dashboard > Site > **Settings** > **Environment variables**
2. กด **"Add a variable"**
3. เพิ่มตัวแปรต่อไปนี้:

```bash
NETLIFY_SITE_ID=your-site-id-here
NETLIFY_AUTH_TOKEN=your-auth-token-here
```

### 2. รับ Site ID และ Auth Token

**Site ID:**
1. ไปที่ Site > **Site settings** > **Site information**
2. คัดลอก **API ID**

**Auth Token:**
1. ไปที่ [https://app.netlify.com/user/applications](https://app.netlify.com/user/applications)
2. กด **"New access token"**
3. ตั้งชื่อและกด **"Generate token"**
4. คัดลอก Token ที่ได้ (จะแสดงครั้งเดียวเท่านั้น)

## 🎨 การตั้งค่า Custom Domain (ถ้าจำเป็น)

### 1. ซื้อ Domain

ซื้อ Domain จากผู้ให้บริการเช่น:
- Namecheap
- GoDaddy
- Google Domains

### 2. เพิ่ม Domain ใน Netlify

1. ไปที่ Netlify Dashboard > Site > **Domain settings**
2. กด **"Add custom domain"**
3. กรอก Domain ที่ซื้อมา
4. กด **"Verify DNS configuration"**

### 3. อัปเดต DNS Records

1. ไปที่ผู้ให้บริการ Domain ที่ซื้อ
2. อัปเดต DNS Records ตามที่ Netlify แนะนำ
3. รอประมาณ 24-48 ชั่วโมงสำหรับการ propagate

## 🔄 การอัปเดตแอปพลิเคชัน

### 1. แก้ไขโค้ด

แก้ไขไฟล์ในเครื่องและ commit:

```bash
git add .
git commit -m "Update features"
git push
```

### 2. Netlify จะ Deploy อัตโนมัติ

Netlify จะตรวจจับการ push และ Deploy อัตโนมัติ

### 3. ตรวจสอบ Deploy Logs

1. ไปที่ Netlify Dashboard > Site > **Deploys**
2. ดูประวัติการ Deploy
3. คลิกที่ Deploy แต่ละครั้งเพื่อดู logs

## 📱 การทดสอบแอปพลิเคชัน

### 1. ทดสอบใน Local

```bash
netlify dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:8080`

### 2. ทดสอบใน Production

1. เข้าไปที่ URL ของ site ที่ Deploy แล้ว
2. ทดสอบทุกฟังก์ชัน:
   - ✅ Login/Logout
   - ✅ บันทึกงานประจำวัน
   - ✅ ประเมิน RPA
   - ✅ Dashboard (สำหรับ Admin)

## 🔐 การตั้งค่า Security

### 1. HTTPS

Netlify ให้ HTTPS อัตโนมัติ ไม่ต้องตั้งค่า

### 2. Password Protection (ถ้าจำเป็น)

1. ไปที่ Site > **Site settings** > **Change site password**
2. ตั้งรหัสผ่านสำหรับทั้ง site
3. กด **"Save"**

### 3. IP Access Control (ถ้าจำเป็น)

1. ไปที่ Site > **Site settings** > **Access control**
2. ตั้งค่า IP addresses ที่อนุญาตหรือปฏิเสธ
3. กด **"Save"**

## 📊 การตรวจสอบ Analytics

### 1. Netlify Analytics

1. ไปที่ Site > **Analytics**
2. ดูข้อมูล visitors, page views, bandwidth
3. ใช้ข้อมูลเพื่อปรับปรุงแอปพลิเคชัน

### 2. Google Analytics (ถ้าจำเป็น)

1. สร้าง GA4 property ใน Google Analytics
2. คัดลอก Tracking ID
3. แก้ไข `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-GA-Measurement-Id = "G-XXXXXXXXXX"
```

## 🆘 การแก้ปัญหา (Troubleshooting)

### ปัญหา: Identity ไม่ทำงาน

**วิธีแก้:**
1. ตรวจสอบว่าได้เปิดใช้งาน Identity แล้ว
2. ตรวจสอบว่า script ถูกโหลดใน HTML
3. ดู Console logs ใน browser

### ปัญหา: Forms ไม่ส่งข้อมูล

**วิธีแก้:**
1. ตรวจสอบว่า form มี `data-netlify="true"`
2. ตรวจสอบว่า `name` attribute ถูกต้อง
3. ดูใน Netlify Dashboard > Forms

### ปัญหา: Dashboard ไม่โหลด

**วิธีแก้:**
1. ตรวจสอบว่าได้เข้าสู่ระบบด้วยอีเมล Admin
2. แก้ไข `app.js` ให้รวมอีเมลของคุณใน `adminEmails`
3. ดู Console logs ใน browser

### ปัญหา: Mobile layout พัง

**วิธีแก้:**
1. ตรวจสอบ viewport meta tag
2. ทดสอบในหลายขนาดหน้าจอ
3. ปรับ CSS ใน `@media` queries

## 📞 การติดต่อสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ:

1. อ่าน [Netlify Documentation](https://docs.netlify.com/)
2. ตรวจสอบ [Netlify Support](https://www.netlify.com/support/)
3. สร้าง Issue ใน GitHub repository
4. ติดต่อผู้วิจัยโดยตรง

## ✅ Checklist ก่อน Launch

- [ ] Deploy สำเร็จแล้ว
- [ ] เปิดใช้งาน Netlify Identity
- [ ] ตั้งค่า Authentication Providers (Google)
- [ ] ทดสอบ Login/Logout
- [ ] ทดสอบ Forms (ส่งข้อมูลทั้ง 2 forms)
- [ ] ตั้งค่า Notifications (Email/Slack)
- [ ] ตั้งค่า Admin email
- [ ] ทดสอบ Dashboard
- [ ] Export ข้อมูลเป็น CSV
- [ ] ทดสอบใน Mobile
- [ ] ตั้งค่า Custom Domain (ถ้าจำเป็น)
- [ ] อัปเดต README ด้วย production URL

---

🎉 **ยินดีด้วย!** แอปพลิเคชันของคุณพร้อมใช้งานแล้ว

สำหรับข้อมูลเพิ่มเติม โปรดดู [README.md](README.md)