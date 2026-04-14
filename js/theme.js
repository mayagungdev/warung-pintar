let isDark = localStorage.getItem("theme") === "dark";
let particleEnabled = true;
let particleCanvas, ctx, animationId;

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

function startFireflyAnimation() {
    stopAnimation();
    particleCanvas = document.createElement("canvas");
    particleCanvas.id = "particleCanvas";
    particleCanvas.style.position = "fixed";
    particleCanvas.style.top = "0";
    particleCanvas.style.left = "0";
    particleCanvas.style.width = "100%";
    particleCanvas.style.height = "100%";
    particleCanvas.style.pointerEvents = "none";
    particleCanvas.style.zIndex = "0";
    document.body.appendChild(particleCanvas);
    ctx = particleCanvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    let particles = [];
    const count = Math.min(40, Math.floor(window.innerWidth / 40));
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 3 + 1,
            alpha: Math.random() * 0.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4
        });
    }
    function animate() {
        if (!particleCanvas || !ctx) return;
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
    particleCanvas.style.position = "fixed";
    particleCanvas.style.top = "0";
    particleCanvas.style.left = "0";
    particleCanvas.style.width = "100%";
    particleCanvas.style.height = "100%";
    particleCanvas.style.pointerEvents = "none";
    particleCanvas.style.zIndex = "0";
    document.body.appendChild(particleCanvas);
    ctx = particleCanvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    let clouds = [];
    const count = Math.min(12, Math.floor(window.innerWidth / 100));
    for (let i = 0; i < count; i++) {
        clouds.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight / 2),
            radius: Math.random() * 50 + 30,
            speed: Math.random() * 0.2 + 0.05
        });
    }
    function animate() {
        if (!particleCanvas || !ctx) return;
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        for (let c of clouds) {
            c.x += c.speed;
            if (c.x > particleCanvas.width + c.radius) c.x = -c.radius;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
            ctx.fill();
        }
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// Inisialisasi
applyTheme();
document.getElementById("themeToggle").addEventListener("click", toggleTheme);