import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { fetchCatByBreed, fetchBreeds } from './cat-api.js';

const selectCat = document.querySelector('#selectElement');
const boxOfCat = document.querySelector('.cat-info');

function createOption(information) {
  const arrayOption = information
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  selectCat.insertAdjacentHTML('beforeend', arrayOption);

  new SlimSelect({
    select: selectCat,
  });
}

function createMarkup(breeds, url) {
  const { name, temperament, description } = breeds;

  const informationOfCat = `      
        <img src="${url}" alt="${name}" width="400"/>
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${temperament}</p>`;
  boxOfCat.innerHTML = informationOfCat;
}

fetchBreeds()
  .then(data => createOption(data))
  .catch(err => console.log(err));

function onChange(e) {
  targetId = e.target.value;
  fetchCatByBreed(targetId)
    .then(({ breeds, url }) => createMarkup(breeds[0], url))
    .catch(err => console.log(err));
}
selectCat.addEventListener('change', onChange);
