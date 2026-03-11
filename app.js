// Initialize Netlify Identity
if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', user => {
        if (!user) {
            window.netlifyIdentity.on('login', user => {
                document.location.reload();
            });
        }
    });
}

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userInfo = document.getElementById('userInfo');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.querySelector('.close');

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        navigateTo(page);
    });
});

function navigateTo(pageId) {
    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Update pages
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
        }
    });

    // Update URL hash
    window.location.hash = pageId;

    // Special handling for dashboard
    if (pageId === 'dashboard') {
        checkDashboardAccess();
    }
}

// Check authentication state
function checkAuthState() {
    const user = window.netlifyIdentity && window.netlifyIdentity.currentUser();
    
    if (user) {
        // User is logged in
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        userInfo.classList.remove('hidden');
        
        const userEmail = user.email;
        const userName = user.user_metadata?.full_name || userEmail.split('@')[0];
        
        userInfo.innerHTML = `
            <strong>ยินดีต้อนรับ, ${userName}</strong><br>
            <small>${userEmail}</small>
        `;

        // Pre-fill user email in forms
        const workflowUserEmail = document.getElementById('workflow-user-email');
        const rpaUserEmail = document.getElementById('rpa-user-email');
        
        if (workflowUserEmail) workflowUserEmail.value = userEmail;
        if (rpaUserEmail) rpaUserEmail.value = userEmail;

    } else {
        // User is not logged in
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        userInfo.classList.add('hidden');
        
        const workflowUserEmail = document.getElementById('workflow-user-email');
        const rpaUserEmail = document.getElementById('rpa-user-email');
        
        if (workflowUserEmail) workflowUserEmail.value = '';
        if (rpaUserEmail) rpaUserEmail.value = '';
    }
}

// Login handler
loginBtn.addEventListener('click', () => {
    if (window.netlifyIdentity) {
        window.netlifyIdentity.open();
    } else {
        alert('Netlify Identity ยังไม่พร้อมใช้งาน');
    }
});

// Logout handler
logoutBtn.addEventListener('click', () => {
    if (window.netlifyIdentity) {
        window.netlifyIdentity.logout();
        setTimeout(() => {
            document.location.reload();
        }, 500);
    }
});

// Set default date to today
function setDefaultDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
}

// Form submissions
const workflowLogForm = document.querySelector('form[name="workflow-log"]');
const rpaAssessmentForm = document.querySelector('form[name="rpa-assessment"]');

if (workflowLogForm) {
    workflowLogForm.addEventListener('submit', async (e) => {
        // Check if user is logged in
        const user = window.netlifyIdentity && window.netlifyIdentity.currentUser();
        if (!user) {
            e.preventDefault();
            alert('กรุณาเข้าสู่ระบบก่อนบันทึกข้อมูล');
            return;
        }

        // Validate form
        if (!validateWorkflowForm()) {
            e.preventDefault();
            return;
        }

        // Let the form submit normally to Netlify
        // The form will be submitted and page will reload
        // Show success message before submit
        const formData = new FormData(workflowLogForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Workflow Log Data:', data);
        
        // Store user email to restore after reload
        localStorage.setItem('userEmail', user.email);
    });
}

if (rpaAssessmentForm) {
    rpaAssessmentForm.addEventListener('submit', async (e) => {
        // Check if user is logged in
        const user = window.netlifyIdentity && window.netlifyIdentity.currentUser();
        if (!user) {
            e.preventDefault();
            alert('กรุณาเข้าสู่ระบบก่อนส่งข้อมูล');
            return;
        }

        // Validate form
        if (!validateRPAForm()) {
            e.preventDefault();
            return;
        }

        // Let the form submit normally to Netlify
        // The form will be submitted and page will reload
        // Show success message before submit
        const formData = new FormData(rpaAssessmentForm);
        const data = Object.fromEntries(formData.entries());
        console.log('RPA Assessment Data:', data);
        
        // Store user email to restore after reload
        localStorage.setItem('userEmail', user.email);
    });
}

// Validate Workflow Form
function validateWorkflowForm() {
    const date = document.getElementById('date').value;
    const pharmacyName = document.getElementById('pharmacy-name').value;
    const shift = document.getElementById('shift').value;

    if (!date) {
        alert('กรุณาระบุวันที่');
        return false;
    }

    if (!pharmacyName.trim()) {
        alert('กรุณาระบุชื่อร้านยา');
        return false;
    }

    if (!shift) {
        alert('กรุณาเลือกกะงาน');
        return false;
    }

    return true;
}

// Validate RPA Form
function validateRPAForm() {
    const taskName = document.getElementById('task-name').value;
    const taskCategory = document.getElementById('task-category').value;
    const frequency = document.getElementById('frequency').value;
    const timePerTask = document.getElementById('time-per-task').value;

    if (!taskName.trim()) {
        alert('กรุณาระบุชื่องาน/กิจกรรม');
        return false;
    }

    if (!taskCategory) {
        alert('กรุณาเลือกหมวดหมู่งาน');
        return false;
    }

    if (!frequency) {
        alert('กรุณาเลือกความถี่ในการทำงาน');
        return false;
    }

    if (!timePerTask || timePerTask < 1) {
        alert('กรุณาระบุเวลาที่ใช้ต่อครั้ง (อย่างน้อย 1 นาที)');
        return false;
    }

    return true;
}

// Success Modal
function showSuccessModal() {
    successModal.classList.add('show');
}

function closeModal() {
    successModal.classList.remove('show');
}

closeModalBtn.addEventListener('click', closeModal);

successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// Dashboard (Admin Only)
function checkDashboardAccess() {
    const dashboardContent = document.getElementById('dashboardContent');
    const user = window.netlifyIdentity && window.netlifyIdentity.currentUser();
    
    // Admin email list - replace with actual admin emails
    const adminEmails = ['wirun.wetsiri@gmail.com', 'asryhero@gmail.com']; // Update with real admin emails
    
    if (!user) {
        dashboardContent.innerHTML = `
            <div class="auth-warning">
                <h3>⚠️ ต้องเข้าสู่ระบบ</h3>
                <p>กรุณาเข้าสู่ระบบเพื่อดู Dashboard</p>
                <button class="btn btn-primary" onclick="document.getElementById('loginBtn').click()">เข้าสู่ระบบ</button>
            </div>
        `;
        return;
    }

    if (!adminEmails.includes(user.email)) {
        dashboardContent.innerHTML = `
            <div class="auth-warning">
                <h3>🔒 ไม่มีสิทธิ์เข้าถึง</h3>
                <p>Dashboard สำหรับ Admin เท่านั้น</p>
                <p><small>อีเมลของคุณ: ${user.email}</small></p>
                <button class="btn btn-primary" onclick="navigateTo('home')">กลับหน้าแรก</button>
            </div>
        `;
        return;
    }

    // Admin user - load dashboard
    loadDashboard();
}

function loadDashboard() {
    const dashboardContent = document.getElementById('dashboardContent');
    
    dashboardContent.innerHTML = `
        <div class="dashboard-header">
            <h3>📊 ภาพรวมข้อมูล</h3>
            <p>ข้อมูลที่รวบรวมจากเภสัชกรทั้งหมด</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <h3 id="totalLogs">0</h3>
                <p>บันทึกงานประจำวัน</p>
            </div>
            <div class="stat-card">
                <h3 id="totalRPA">0</h3>
                <p>ประเมิน RPA</p>
            </div>
            <div class="stat-card">
                <h3 id="totalUsers">0</h3>
                <p>ผู้ใช้งานทั้งหมด</p>
            </div>
            <div class="stat-card">
                <h3 id="avgTime">0</h3>
                <p>เวลาเฉลี่ย/วัน (นาที)</p>
            </div>
        </div>

        <div class="dashboard-section">
            <h4>📋 งานที่มีศักยภาพสูงในการใช้ RPA</h4>
            <div id="highRPAList" class="task-list">
                <p class="loading">กำลังโหลดข้อมูล...</p>
            </div>
        </div>

        <div class="dashboard-section">
            <h4>⏱️ กิจกรรมที่ใช้เวลามากที่สุด (Bottlenecks)</h4>
            <div id="bottleneckList" class="task-list">
                <p class="loading">กำลังโหลดข้อมูล...</p>
            </div>
        </div>

        <div class="dashboard-section">
            <h4>💾 จัดการข้อมูล</h4>
            <p>คุณสามารถ Export ข้อมูลจาก Netlify Dashboard เพื่อนำไปวิเคราะห์เพิ่มเติม</p>
            <a href="https://app.netlify.com/sites/smart-pharmacy-workflow-analyzer/forms" target="_blank" class="btn btn-primary">
                ดูข้อมูลทั้งหมดใน Netlify
            </a>
        </div>
    `;

    // Load sample data (replace with actual API calls)
    setTimeout(() => {
        loadDashboardData();
    }, 1000);
}

function loadDashboardData() {
    // Sample data - replace with actual data from Netlify Functions or API
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

    // Update stats
    document.getElementById('totalLogs').textContent = sampleData.totalLogs;
    document.getElementById('totalRPA').textContent = sampleData.totalRPA;
    document.getElementById('totalUsers').textContent = sampleData.totalUsers;
    document.getElementById('avgTime').textContent = sampleData.avgTime;

    // Update High RPA List
    const highRPAList = document.getElementById('highRPAList');
    highRPAList.innerHTML = sampleData.highRPATasks.map(task => `
        <div class="task-item">
            <div class="task-info">
                <strong>${task.task}</strong>
                <small>คะแนน: ${task.score}/5 | จำนวนผู้ประเมิน: ${task.count} คน</small>
            </div>
            <div class="task-score">
                <span class="score-badge">${task.score}</span>
            </div>
        </div>
    `).join('');

    // Update Bottleneck List
    const bottleneckList = document.getElementById('bottleneckList');
    bottleneckList.innerHTML = sampleData.bottlenecks.map(task => `
        <div class="task-item">
            <div class="task-info">
                <strong>${task.task}</strong>
                <small>เวลาเฉลี่ย: ${task.avgMinutes} นาที</small>
            </div>
            <div class="task-time">
                <span class="time-badge">${task.avgMinutes} นาที</span>
            </div>
        </div>
    `).join('');
}

// Add dashboard-specific styles dynamically
const dashboardStyles = document.createElement('style');
dashboardStyles.textContent = `
    .auth-warning {
        text-align: center;
        padding: 3rem 2rem;
    }

    .auth-warning h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--warning-color);
    }

    .auth-warning p {
        margin-bottom: 1.5rem;
        color: var(--text-secondary);
    }

    .dashboard-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid var(--border);
    }

    .dashboard-header h3 {
        font-size: 1.5rem;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .dashboard-section {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background-color: #f8fafc;
        border-radius: var(--radius);
    }

    .dashboard-section h4 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }

    .task-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .task-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: var(--surface);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
    }

    .task-info {
        flex: 1;
    }

    .task-info strong {
        display: block;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
    }

    .task-info small {
        display: block;
        color: var(--text-secondary);
    }

    .task-score,
    .task-time {
        margin-left: 1rem;
    }

    .score-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        background-color: #dcfce7;
        color: #166534;
        border-radius: var(--radius);
        font-weight: 600;
    }

    .time-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        background-color: #fef3c7;
        color: #92400e;
        border-radius: var(--radius);
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .task-item {
            flex-direction: column;
            align-items: flex-start;
        }

        .task-score,
        .task-time {
            margin-left: 0;
            margin-top: 0.5rem;
        }
    }
`;
document.head.appendChild(dashboardStyles);

// Handle URL hash on page load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        navigateTo(hash);
    }
    
    setDefaultDate();
    checkAuthState();
    
    // Check if form was just submitted
    const formSubmitted = localStorage.getItem('formSubmitted');
    if (formSubmitted === 'true') {
        showSuccessModal();
        localStorage.removeItem('formSubmitted');
    }
});

// Handle hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        navigateTo(hash);
    }
});

// Listen for Netlify Identity events
if (window.netlifyIdentity) {
    window.netlifyIdentity.on('login', checkAuthState);
    window.netlifyIdentity.on('logout', checkAuthState);
}
