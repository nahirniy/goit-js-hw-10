import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import { fetchCatByBreed, fetchBreeds } from './cat-api.js';

const selectCat = document.querySelector('.breed-select');
const boxOfCat = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');
const defaultOption = document.querySelector('.default-option');
defaultOption.setAttribute('disabled', 'true');

function createOption(information) {
  const arrayOption = information
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  selectCat.insertAdjacentHTML('beforeend', arrayOption);

  new SlimSelect({
    select: selectCat,
  });

  loader.style.display = 'none';
}

function createMarkup(breeds, url) {
  const { name, temperament, description } = breeds;

  const informationOfCat = `      
        <img src="${url}" alt="${name}" width="600"/>
        <div class="box-of-cat">
          <h2 class="header">${name}</h2>
          <p><b>Description:</b> ${description}</p>
          <p class="temperament"><b>Temperament:</b> ${temperament}</p>
        </div>`;
  boxOfCat.innerHTML = informationOfCat;
}

fetchBreeds()
  .then(data => createOption(data))
  .catch(() => {
    Notiflix.Notify.failure(error.textContent);
    error.style.display = 'block';
    loader.style.display = 'none';
  });

function onChange(e) {
  error.style.display = 'none';
  loader.style.display = 'block';
  boxOfCat.style.display = 'none';
  const targetId = e.target.value;

  fetchCatByBreed(targetId)
    .then(({ breeds, url }) => {
      createMarkup(breeds[0], url);

      loader.style.display = 'none';
      boxOfCat.style.display = 'flex';
    })
    .catch(() => {
      Notiflix.Notify.failure(error.textContent);
      error.style.display = 'block';
      loader.style.display = 'none';
    });
}
selectCat.addEventListener('change', onChange);
