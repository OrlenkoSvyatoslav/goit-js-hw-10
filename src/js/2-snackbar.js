'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitShowPrimice);

function onSubmitShowPrimice(event) {
  event.preventDefault();
  const inputDalayValue = form.elements.delay.value;
  const inputRadioValue = form.elements.state.value;
  function showPromice(time, value) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value === 'fulfilled') {
          resolve(time);
        }
        reject(time);
      }, inputDalayValue);
      form.reset();
    });
    return promise;
  }
  showPromice(inputDalayValue, inputRadioValue)
    .then(values => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${values}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
      });
    });
}
