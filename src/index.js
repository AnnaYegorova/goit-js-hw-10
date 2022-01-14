import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputValue = e.target.value.trim();
  fetchCountries(inputValue)
    .then(renderMarkUpCard)
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}
// function fetchCountries(name) {
//   const filterUrl = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages `;
//   return fetch(filterUrl).then(responce => {
//     return responce.json();
//   });
// }

function renderMarkUpCard(obj) {
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
    console.log(obj);
    const markUpCard = obj
      .map(
        ({ flags, name, capital, population, languages }) => `<div class="card">
        <ul class="card__list"><img src = "${flags.svg}" width = "30px"><span class = "card__name"> ${name.official}</span>
  <li class="card__item">Capital: <span class = "card__span">${capital}</span></li>
  <li class="card__item">Population: <span class = "card__span">${population}</span></li>
  <li class="card__item">Languages: <span class = "card__span">${languages}</span></li>
        </ul>
  </div>`,
      )
      .join('');
    div.insertAdjacentHTML('beforeend', markUpCard);
  }
}
