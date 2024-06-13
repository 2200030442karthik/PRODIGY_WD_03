// script.js
let timer;
let running = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateDisplay() {
    let time = new Date(elapsedTime);
    let minutes = String(time.getUTCMinutes()).padStart(2, '0');
    let seconds = String(time.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(() => {
            updateDisplay();
            elapsedTime += 10; // Update every 10 milliseconds
        }, 10);
        startStopBtn.textContent = 'Stop';
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    lapTimes = [];
    startStopBtn.textContent = 'Start';
    updateDisplay();
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        let lapTime = elapsedTime;
        lapTimes.push(lapTime);
        let lapDisplay = document.createElement('li');
        let time = new Date(lapTime);
        let minutes = String(time.getUTCMinutes()).padStart(2, '0');
        let seconds = String(time.getUTCSeconds()).padStart(2, '0');
        let milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
        lapDisplay.textContent = `Lap ${lapTimes.length}: ${minutes}:${seconds}:${milliseconds}`;
        laps.appendChild(lapDisplay);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

updateDisplay();
