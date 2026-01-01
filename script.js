// ================= CANVAS SETUP =================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ================= BACKGROUND PARTICLES =================
const particles = [];
const colors = ["#ff004c", "#00eaff", "#ffd700", "#9d00ff", "#00ff85"];

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.6,
    speedY: (Math.random() - 0.5) * 0.6,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

// ================= FIREWORKS =================
let fireworks = [];
let fireworksStarted = false;

function startFireworks() {
  if (fireworksStarted) return;
  fireworksStarted = true;

  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6;
    createFirework(x, y);
  }, 700);
}

function createFirework(x, y) {
  for (let i = 0; i < 25; i++) {
    fireworks.push({
      x,
      y,
      vx: Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 3 + 2),
      vy: Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 3 + 2),
      life: 60,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }
}

// ================= ANIMATION LOOP =================
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background particles
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });

  // Fireworks
  fireworks.forEach((f, i) => {
    f.x += f.vx;
    f.y += f.vy;
    f.life--;
    ctx.fillStyle = f.color;
    ctx.fillRect(f.x, f.y, 3, 3);
    if (f.life <= 0) fireworks.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

// ================= UI ELEMENTS =================
const continueBtn = document.getElementById("continueBtn");
const cardWrapper = document.querySelector(".card-wrapper");
const countdown = document.getElementById("countdown");
const countNumber = document.getElementById("countNumber");
const newYearMessage = document.getElementById("newYearMessage");
const finalName = document.getElementById("finalName");
const giftBtn = document.getElementById("giftBtn");
const giftBox = document.getElementById("giftBox");
const giftMessage = document.getElementById("giftMessage");

// ================= CONTINUE BUTTON =================
continueBtn.addEventListener("click", () => {
  const name = document.getElementById("userName").value.trim();
  if (!name) {
    alert("Please enter your name 🙂");
    return;
  }

  cardWrapper.classList.add("fly-away");

  setTimeout(startCountdown, 1200);
});

// ================= COUNTDOWN =================
function startCountdown() {
  countdown.classList.remove("hidden");

  let count = 5;
  countNumber.textContent = count;

  const timer = setInterval(() => {
    count--;
    countNumber.textContent = count;

    if (count === 0) {
      clearInterval(timer);

      setTimeout(() => {
        countdown.classList.add("hidden");
        showNewYearMessage();
      }, 500);
    }
  }, 1000);
}

// ================= NEW YEAR MESSAGE =================
function showNewYearMessage() {
  const name = document.getElementById("userName").value;
  finalName.textContent = name;

  newYearMessage.classList.remove("hidden");
  startFireworks();

  setTimeout(() => {
    giftBtn.classList.remove("hidden");

    // Hide New Year message when gift button appears
    newYearMessage.classList.add("hidden");
  }, 1500);
}

// ================= GIFT BUTTON =================
if (giftBtn && giftBox && giftMessage) {
  giftBtn.addEventListener("click", () => {
    giftBtn.classList.add("hidden");
    giftBox.classList.remove("hidden");
  });

  giftBox.addEventListener("mouseenter", moveGiftBox);

  giftBox.addEventListener("click", () => {
    giftBox.removeEventListener("mouseenter", moveGiftBox);
    giftBox.classList.add("open");

    setTimeout(() => {
      giftMessage.classList.remove("hidden");
    }, 600);
  });
}

// ================= GIFT BOX MOVE =================
function moveGiftBox() {
  const padding = 80;

  const maxX = window.innerWidth - giftBox.offsetWidth - padding;
  const maxY = window.innerHeight - giftBox.offsetHeight - padding;

  const x = Math.random() * maxX + padding / 2;
  const y = Math.random() * maxY + padding / 2;

  giftBox.style.left = `${x}px`;
  giftBox.style.top = `${y}px`;
  giftBox.style.transform = "none";
}
