let isDark = localStorage.getItem("theme") === "dark";
let particleEnabled = true;

function applyTheme() {
    if (isDark) {
        document.body.classList.add("dark");
        document.getElementById("themeToggle").innerHTML = "☀️";
        if (particleEnabled) startFireflyAnimation();
    } else {
        document.body.classList.remove("dark");
        document.getElementById("themeToggle").innerHTML = "🌙";
        if (particleEnabled) startCloudAnimation();
    }
}

function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyTheme();
}

let particleCanvas, ctx, animationId;
function startFireflyAnimation() {
    stopAnimation();
    particleCanvas = document.createElement("canvas");
    particleCanvas.id = "particleCanvas";
    document.body.appendChild(particleCanvas);
    ctx = particleCanvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    let particles = [];
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 3 + 1,
            alpha: Math.random() * 0.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }
    function animate() {
        if (!particleCanvas) return;
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        for (let p of particles) {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = particleCanvas.width;
            if (p.x > particleCanvas.width) p.x = 0;
            if (p.y < 0) p.y = particleCanvas.height;
            if (p.y > particleCanvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 220, 100, ${p.alpha})`;
            ctx.fill();
        }
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

function startCloudAnimation() {
    stopAnimation();
    particleCanvas = document.createElement("canvas");
    particleCanvas.id = "particleCanvas";
    document.body.appendChild(particleCanvas);
    ctx = particleCanvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    let clouds = [];
    for (let i = 0; i < 8; i++) {
        clouds.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight / 2),
            radius: Math.random() * 40 + 20,
            speed: Math.random() * 0.3 + 0.1
        });
    }
    function animate() {
        if (!particleCanvas) return;
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        for (let c of clouds) {
            c.x += c.speed;
            if (c.x > particleCanvas.width + c.radius) c.x = -c.radius;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

function stopAnimation() {
    if (animationId) cancelAnimationFrame(animationId);
    if (particleCanvas) particleCanvas.remove();
}

function resizeCanvas() {
    if (particleCanvas) {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
}

// Inisialisasi
applyTheme();
document.getElementById("themeToggle").addEventListener("click", toggleTheme);