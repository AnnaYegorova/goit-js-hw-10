import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  // e.preventDafault();
  const inputValue = e.target.value.trim();
  console.log(inputValue);
  fetchCountries(inputValue);

  // renderMarkUpCard(inputValue);
}
function fetchCountries(name) {
  const filterUrl = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages `;

  fetch(filterUrl)
    .then(r => r.json())
    .then(data => {
      console.log(data);
      renderMarkUpCard(data);
    })
    .catch(error => console.log(error));
}

function renderMarkUpCard(obj) {
  console.log(obj.length);
  if (obj.length > 10) {
    div.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (obj.length < 10 && obj.length >= 2) {
    div.innerHTML = '';
    const markUpCards = obj
      .map(
        ({ flags, name }) =>
          `<div class="card">
        <ul class="card__list"><img src = "${flags.svg}" width = "30px"><span class = "card__name"> ${name.official}</span>
        </ul>
  </div>`,
      )
      .join('');
    div.insertAdjacentHTML('beforeend', markUpCards);
  } else if ((obj.length = 1)) {
    div.innerHTML = '';
    const markUpCard = obj
      .map(
        ({ flags, name, capital, population, languages }) => `<div class="card">
        <ul class="card__list"><img src = "${flags.svg}" width = "30px"><span class = "card__name"> ${name.official}</span>
  <li class="card__item">Capital: <span class = "card__span">${capital}</span></li>
  <li class="card__item">Population: <span class = "card__span">${population}</span></li>
  <li class="card__item">Language: <span class = "card__span">${languages}</span></li>
        </ul>
  </div>`,
      )
      .join('');
    div.insertAdjacentHTML('beforeend', markUpCard);
  } else if (!obj) {
    console.log('Oops');
  }
}
