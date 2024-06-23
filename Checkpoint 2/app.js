let timers = [null, null, null, null, null];
let times = [0, 0, 0, 0, 0];
let running = [false, false, false, false, false];

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000); // Chuyển từ ms sang giây
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; //Dùng để chuyển số phút, giây thành 1 chuỗi và đảm bảo nó có 2 kí tự, thêm số 0 ở đầu tiên nếu cần thiết (như: 1 thành "01")
}

function updateTimer(index) {
    if (running[index]) {
        times[index] += 1000; // Tăng thời gian thêm 1 giây (1000ms)
        document.getElementById(`time${index + 1}`).innerText = formatTime(times[index]);
        timers[index] = setTimeout(() => updateTimer(index), 1000); // Cập nhật mỗi giây
    }
}

function startTimer(index) {
    if (!running[index - 1]) {
        running[index - 1] = true;
        updateTimer(index - 1);
    }
}

function pauseTimer(index) {
    running[index - 1] = false;
    clearTimeout(timers[index - 1]);
}

function stopTimer(index) {
    running[index - 1] = false;
    clearTimeout(timers[index - 1]);
    times[index - 1] = 0;
    document.getElementById(`time${index}`).innerText = '00:00';
}

function startAllTimers() {
    for (let i = 0; i < timers.length; i++) {
        if (!running[i]) {
            running[i] = true;
            updateTimer(i);
        }
    }
}

function stopAllTimers() {
    for (let i = 0; i < timers.length; i++) {
        running[i] = false;
        clearTimeout(timers[i]);
        times[i] = 0;
        document.getElementById(`time${i + 1}`).innerText = '00:00';
    }
}
