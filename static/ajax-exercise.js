'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div

  fetch('/fortune')
    .then((response) => response.text())
    .then((serverAnswer) => {                             //this is the answer from server with the data requested
      document.getElementById('fortune-text').innerText = serverAnswer;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = 

  // TODO: request weather with that URL and show the forecast in #weather-info

  fetch(url)
  .then((response) => response.json())
  .then((serverAnswer) => {
    document.getElementById('weather-info').innerText = serverAnswer.forecast;
    console.log(serverAnswer.forecast);
    
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
      document.getElementById('order-status').innerText = `${code}. ${msg}`;  

    });


  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
