const setup = document.getElementById('setup');
const display = document.getElementById('display');
const timerText = document.getElementById('timerText');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const flashToggle = document.getElementById('flashToggle');
const flashBtn = document.getElementById('flashBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let totalSeconds = 0;
let remainingSeconds = 0;
let intervalId = null;
let isPaused = false;

function pad(n) {
  return n.toString().padStart(2, '0');
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${pad(m)}:${pad(s)}`;
}

function updateDisplay() {
  timerText.textContent = formatTime(remainingSeconds);

  timerText.classList.remove('warning', 'danger');
  if (remainingSeconds <= 10 && remainingSeconds > 0) {
    timerText.classList.add('danger');
  } else if (remainingSeconds <= 30 && remainingSeconds > 10) {
    timerText.classList.add('warning');
  }
}

function requestFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  else if (el.msRequestFullscreen) el.msRequestFullscreen();
}

function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

function startTimer() {
  const mins = parseInt(minutesInput.value, 10) || 0;
  const secs = parseInt(secondsInput.value, 10) || 0;
  totalSeconds = mins * 60 + secs;

  if (totalSeconds <= 0) return;

  remainingSeconds = totalSeconds;
  isPaused = false;

  if (flashToggle.checked) {
    timerText.classList.add('flash');
  } else {
    timerText.classList.remove('flash');
  }

  setup.classList.add('hidden');
  display.classList.remove('hidden');

  requestFullscreen();
  updateDisplay();

  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (!isPaused) {
      remainingSeconds--;
      updateDisplay();

      if (remainingSeconds <= 0) {
        clearInterval(intervalId);
        timerText.classList.add('flash');
        timerText.classList.add('danger');
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

function resetTimer() {
  clearInterval(intervalId);
  setup.classList.remove('hidden');
  display.classList.add('hidden');
  timerText.classList.remove('flash', 'warning', 'danger');
  pauseBtn.textContent = 'Pause';
  exitFullscreen();
}

flashBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Prevent invalid input
[minutesInput, secondsInput].forEach(input => {
  input.addEventListener('change', () => {
    let val = parseInt(input.value, 10);
    if (isNaN(val) || val < 0) val = 0;
    if (input.id === 'seconds' && val > 59) val = 59;
    input.value = pad(val);
  });
});
