// العناصر
const fp = document.getElementById("fingerprint");
const fpText = document.getElementById("fpText");
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");
const welcome = document.getElementById("welcome");
const emailInput = document.getElementById("email");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// الأصوات
const fpSound = document.getElementById("fpSound");
const clickSound = document.getElementById("clickSound");
const successSound = document.getElementById("successSound");
const errorSound = document.getElementById("errorSound");

// البصمة
let holdTimer;
let userName = "";

fp.addEventListener("mousedown", () => {
    fp.classList.add("active");
    fpSound.play();
    fpText.innerText = "جاري التحقق...";

    holdTimer = setTimeout(() => {
        successSound.play();
        alert("✅ تم اكمال الاجراء");
        stage1.classList.remove("active");
        stage2.classList.add("active");
    }, 5000);
});

fp.addEventListener("mouseup", resetFP);
fp.addEventListener("mouseleave", resetFP);

function resetFP() {
    fp.classList.remove("active");
    fpText.innerText = "اضغط 5 ثواني";
    clearTimeout(holdTimer);
}

// إدخال الإيميل
function saveEmail() {
    clickSound.play();
    const email = emailInput.value.trim();
    if (!email.includes("@")) {
        errorSound.play();
        alert("❌ ايميل غير صالح");
        return;
    }
    userName = email.split("@")[0];
    stage2.classList.remove("active");
    stage3.classList.add("active");
    welcome.innerText = `أهلاً بك ${userName}`;
}

// تسجيل الدخول
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    clickSound.play();

    const u = usernameInput.value.trim();
    const p = passwordInput.value.trim();

    if (u === "chroma" && p === "Chroma@2026#Secure") {
        successSound.play();
        alert(`🎉 أهلاً بك ${userName}`);
        // هنا ممكن تحويل للصفحة التالية
    } else {
        errorSound.play();
        alert("❌ اليوزر نيم أو كلمة السر غير صحيحة");
    }
});

// أصوات عند التركيز على الحقول
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("focus", () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});
