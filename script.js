let startTime, interval, elapsed = 0;
let running = false;
let laps = [];
let lastLap = 0;

const display = document.getElementById('flipDisplay');
const lapHeader = document.getElementById('lapHeader');
const themeToggle = document.getElementById('themeToggle');

function initDisplay() {
  display.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const digit = document.createElement('div');
    digit.classList.add('flip-digit');
    const span = document.createElement('span');
    span.textContent = '0';
    digit.appendChild(span);
    display.appendChild(digit);
    if (i === 1 || i === 3 || i === 5) {
      const colon = document.createElement('div');
      colon.textContent = ':';
      colon.style.margin = '0 5px';
      colon.style.fontSize = '36px';
      display.appendChild(colon);
    }
  }
}

function updateDisplay(time) {
  const cs = Math.floor((time % 1000) / 10);
  const sec = Math.floor(time / 1000) % 60;
  const min = Math.floor((time / 60000) % 60);
  const hr = Math.floor(time / 3600000);
  const str = `${String(hr).padStart(2, '0')}${String(min).padStart(2, '0')}${String(sec).padStart(2, '0')}${String(cs).padStart(2, '0')}`;
  const spans = document.querySelectorAll('.flip-digit span');
  str.split('').forEach((num, i) => {
    if (spans[i].textContent !== num) {
      spans[i].style.opacity = '0';
      spans[i].style.transform = 'translateY(-100%)';
      setTimeout(() => {
        spans[i].textContent = num;
        spans[i].style.opacity = '1';
        spans[i].style.transform = 'translateY(0)';
      }, 150);
    }
  });
}

function startTimer() {
  if (!running) {
    startTime = Date.now() - elapsed;
    interval = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay(elapsed);
    }, 30);
    running = true;
  }
}

function stopTimer() {
  clearInterval(interval);
  running = false;
}

function resetTimer() {
  clearInterval(interval);
  elapsed = 0;
  lastLap = 0;
  laps = [];
  running = false;
  updateDisplay(0);
  document.getElementById('lapTable').innerHTML = '';
  lapHeader.style.display = 'none';
}

function formatTime(ms) {
  const cs = Math.floor((ms % 1000) / 10);
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor((ms / 60000) % 60);
  const hr = Math.floor(ms / 3600000);
  return `${String(hr).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
}

function recordLap() {
  if (!running) return;
  if (laps.length === 0) lapHeader.style.display = 'table-header-group';
  const total = elapsed;
  const lapTime = total - lastLap;
  lastLap = total;
  laps.unshift({ total, lapTime });
  renderLaps();
}

function renderLaps() {
  const tbody = document.getElementById('lapTable');
  tbody.innerHTML = '';
  if (!laps.length) return;

  let min = Math.min(...laps.map(l => l.lapTime));
  let max = Math.max(...laps.map(l => l.lapTime));
  const colors = ['lap-color-0', 'lap-color-1', 'lap-color-2', 'lap-color-3', 'lap-color-4', 'lap-color-5', 'lap-color-6', 'lap-color-7'];

  laps.forEach((lap, i) => {
    const lapNum = laps.length - i;
    const lapTimeStr = formatTime(lap.lapTime);
    const totalTimeStr = formatTime(lap.total);
    const colorClass = colors[i % colors.length];
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${String(lapNum).padStart(2, '0')}</td>
      <td class="${colorClass}">${lapTimeStr}</td>
      <td>${totalTimeStr}</td>
    `;
    tbody.appendChild(row);
  });
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  themeToggle.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
}

initDisplay();
