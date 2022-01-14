function fetchCountries(name) {
  const filterUrl = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages `;
  return fetch(filterUrl).then(responce => {
    return responce.json();
  });
}
export { fetchCountries };
