const SCRIPT_URL = "رابط_الـ_WEB_APP_هنا";

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    // تحديث السايدبار
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
}

async function performLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    
    toggleLoader(true);
    const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'login', u: u, p: p })
    });
    const data = await response.json();
    toggleLoader(false);

    if (data.success) {
        localStorage.setItem('user', JSON.stringify(data));
        renderMenu(data.role);
    } else {
        alert("خطأ في البيانات!");
    }
}

function renderMenu(role) {
    const nav = document.getElementById('navLinks');
    if (role === 'admin') {
        nav.innerHTML = `
            <li onclick="showSection('adminDash')"><i class="fa fa-dashboard"></i> الإدارة</li>
            <li onclick="logout()"><i class="fa fa-sign-out"></i> خروج</li>
        `;
        showSection('adminDash');
    } else {
        nav.innerHTML = `
            <li onclick="showSection('studentZone')"><i class="fa fa-play"></i> حصصي</li>
            <li onclick="logout()"><i class="fa fa-sign-out"></i> خروج</li>
        `;
        showSection('studentZone');
    }
}

async function adminAddStudent() {
    const student = {
        name: document.getElementById('stName').value,
        user: document.getElementById('stUser').value,
        pass: document.getElementById('stPass').value,
        group: "عام"
    };
    await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'addStudent', data: student }) });
    alert("تم إضافة الطالب بنجاح");
}

function logout() {
    localStorage.clear();
    location.reload();
}

function toggleLoader(show) {
    document.getElementById('loader').style.display = show ? 'block' : 'none';
}
