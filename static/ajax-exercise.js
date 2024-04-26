'use strict';

// PART 1: SHOW A FORTUNE

function showFortune() {

  fetch('/fortune')
    .then((response) => response.text())
    .then((serverAnswer) => {             //this is the answer from server with the data requested
      document.getElementById('fortune-text').innerHTML = serverAnswer;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value.toString();
  const queryString = new URLSearchParams({ 'zipcode': zipcode});
  

  fetch(`${url}?${queryString}`)
  .then((response) => response.json())
  .then((serverAnswer) => {
    document.getElementById('weather-info').innerText = serverAnswer.forecast;
    console.log(typeof(zipcode));
    console.log(serverAnswer);
    
  });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);


// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();
  
  const url = '/order-melons.json';
  const formInputs = {
    qty: document.getElementById('qty-field').value,
    melon_type: document.getElementById('melon-type-field').value
  };  

  fetch(url, {
    method:'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((serverAnswer) => {
      const code = serverAnswer.code;
      const msg = serverAnswer.msg;

      const orderStatus = document.getElementById('order-status');

      if (code === 'ERROR') {
        orderStatus.classList.add('order-error');
      } else {
        orderStatus.classList.remove('order-error');
      };

      orderStatus.innerHTML = `${code}. ${msg}`;  

    });

}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


// FURTHER STUDY

const getDogImage = () => {

  fetch('/dog.json')
    .then((response) => response.json())
    .then((serverAnswer) => {     

      const elementToAdd = `<img id='dog' src=${serverAnswer} />`
      const targetElement = document.getElementById('dog-image')
      
      if (! document.getElementById('dog')) {
        targetElement.insertAdjacentHTML('beforeEnd', elementToAdd);
      } else {
        const dogPhoto = document.getElementById('dog');
        dogPhoto.src=serverAnswer;
      };  
    }); 
}

document.getElementById('get-dog-image').addEventListener('click', getDogImage);
