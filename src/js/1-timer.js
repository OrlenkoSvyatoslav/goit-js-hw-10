'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateTimer = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMinutes = document.querySelector('[data-minutes]');
const dateSeconds = document.querySelector('[data-seconds]');
let countInterval;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.setAttribute('disabled', '');
    } else {
      startBtn.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 10) {
    return String(value).padStart(2, '0');
  } else {
    return value;
  }
}

function startCount() {
  const now = userSelectedDate - Date.now();
  if (now <= 0) {
    clearInterval(countInterval);
    return;
  }
  startBtn.classList.add('disabled-btn');
  startBtn.classList.remove('active-btn');
  startBtn.setAttribute('disabled', '');
  inputDateTimer.setAttribute('disabled', '');

  const { days, hours, minutes, seconds } = convertMs(now);

  dateDays.textContent = addLeadingZero(days);
  dateHours.textContent = addLeadingZero(hours);
  dateMinutes.textContent = addLeadingZero(minutes);
  dateSeconds.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', onClickStartBtnTimer);

function onClickStartBtnTimer() {
  startCount();
  countInterval = setInterval(startCount, 1000);
}
