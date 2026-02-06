const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const speedInput = document.getElementById("speed");
const dotSizeInput = document.getElementById("dotSize");
const sizeInput = document.getElementById("size");
const modeSelect = document.getElementById("mode");

const bgColor = document.getElementById("bgColor");
const dotColor = document.getElementById("dotColor");

const speedVal = document.getElementById("speedVal");
const dotSizeVal = document.getElementById("dotSizeVal");
const sizeVal = document.getElementById("sizeVal");

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");

let speed = +speedInput.value;
let dotSize = +dotSizeInput.value;
let size = +sizeInput.value;
let mode = modeSelect.value;

let angle = 0;
let t = 0;
let dir = 1;

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
addEventListener("resize", resize);
resize();

menuBtn.onclick = () => menu.classList.toggle("open");

function updateLabels() {
  speedVal.textContent = speed.toFixed(3);
  dotSizeVal.textContent = dotSize;
  sizeVal.textContent = size.toFixed(2);
}
updateLabels();

speedInput.oninput = () => (speed = +speedInput.value, updateLabels());
dotSizeInput.oninput = () => (dotSize = +dotSizeInput.value, updateLabels());
sizeInput.oninput = () => (size = +sizeInput.value, updateLabels());
modeSelect.onchange = () => (mode = modeSelect.value);

function draw() {
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;

  ctx.fillStyle = bgColor.value;
  ctx.fillRect(0, 0, w, h);

  let x, y;

  if (mode === "circle") {
    const r = Math.min(w, h) * size;
    angle += speed;
    x = cx + r * Math.cos(angle);
    y = cy + r * Math.sin(angle);
  }

  if (mode === "line") {
    const padding = dotSize; // keeps dot fully visible

    // advance forward only
    t += speed * 2;
    if (t > 1) t = 0;

    x = padding + t * (w - padding * 2);
    y = cy;
  }

  ctx.fillStyle = dotColor.value;
  ctx.beginPath();
  ctx.arc(x, y, dotSize, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(draw);
}

draw();
