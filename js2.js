let hh = document.querySelector('#hh')
let mm = document.querySelector('#mm')
let ss = document.querySelector('#ss')

let inputs = document.querySelectorAll('input')

let count = document.querySelector('.count')
let stop = document.querySelector('.stop')

let daysDiv = document.querySelector('.daysDiv')

let clock = document.getElementById('clockdiv');
let daysSpan = clock.querySelector('.days');
let hoursSpan = clock.querySelector('.hours');
let minutesSpan = clock.querySelector('.minutes');
let secondsSpan = clock.querySelector('.seconds');

let timeinterval;

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()); // 1678641396000 - 1678641356000
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(endtime) {
    function updateClock() {
        const t = getTimeRemaining(endtime);
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.total < 1) {
            clearInterval(timeinterval);
            alert('отсчет окончен')
            daysSpan.innerHTML = 0
            hoursSpan.innerHTML = 0
            minutesSpan.innerHTML = 0
            secondsSpan.innerHTML = 0
            count.disabled = false
        }
    }
    updateClock();
    timeinterval = setInterval(updateClock, 1000);
}
//Mon Mar 27 2023 20:13:19 GMT+0300 (Москва, стандартное время)
// timeend = new Date(ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАСЫ-1, МИНУТЫ);

count.addEventListener('click', function () {
    if(inputs[0].value > 24){
        daysDiv.classList.remove('daysDiv')
    }
    clearInterval(timeinterval);
    const deadline = new Date(Date.parse(new Date()) + ((hh.value * 3600000) + (mm.value * 60000) + (ss.value * 1000)));
    initializeClock(deadline);
    for(let input of inputs){
        input.value = null
    }
    count.disabled = true
})

stop.addEventListener('click', function () {
    clearInterval(timeinterval);
    daysSpan.innerHTML = 0
    hoursSpan.innerHTML = 0
    minutesSpan.innerHTML = 0
    secondsSpan.innerHTML = 0
    count.disabled = false
    daysDiv.classList.add('daysDiv')

})

for(let input of inputs){
    input.addEventListener('change', function () {
        if (input.value < 0) {
            input.classList.add('error')
            count.disabled = true
        } else {
            input.classList.remove('error')

            count.disabled = false
        }
    })
}