const timeCount = document.getElementById('timeCount');
const timeUp = document.getElementById('timeUp');
const timeDown = document.getElementById('timeDown');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
var interval;

var startTime = 10;
let time = startTime * 60;

function startTimer() {
interval = setInterval(countDown, 1000);
start.style.display = 'none';
stop.style.display = 'block';
}
function stopTimer() {
clearInterval(interval);
stop.style.display = 'none';
start.style.display = 'block'
}

function countDown() {
    var minutes = Math.floor(time / 60 );
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    timeCount.innerHTML = minutes + ":" + seconds; 
    time--;
}

function increaseTime() {
    time = time + 30;

    var minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    timeCount.innerHTML = minutes + ":" + seconds;
    console.log(time);
}

function decreaseTime() {
    time = time - 30;

    var minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    timeCount.innerHTML = minutes + ":" + seconds;
}
start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
timeUp.addEventListener('click', increaseTime);
timeDown.addEventListener('click', decreaseTime);