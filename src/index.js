import axios from 'axios';
import '../node_modules/modern-normalize/modern-normalize.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
// import fetchCatByBreed from './cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};

axios.defaults.headers.common['x-api-key'] =
  'live_zFksffvjV5C1VI3jqdVkoP6lGz4eQnTFRekdHtefmwojLFX28yJABEnBPGHJIB1T';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

async function fetchBreeds() {
  return (data = await axios
    .get('/breeds')
    .then(resp => resp.data.map(data => data))
    .catch(err => {
      console.error(err);
    }));
}

// Create options markup -->
fetchBreeds().then(data =>
  data.forEach(({ id, name }) =>
    refs.breedSelect.insertAdjacentHTML(
      'beforeend',
      `<option value="${id}">${name}</option>`
    )
  )
);

function fetchCatByBreed(breedId) {
  return (data = axios
    .get('/images/search', {
      params: {
        breed_ids: breedId,
      },
    })
    .then(resp => (refs.catInfo.innerHTML = createMarkup(resp)))
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      refs.catInfo.innerHTML = '';
    }));
}

refs.breedSelect.addEventListener('change', onSelect);

function onSelect() {
  refs.catInfo.innerHTML = '<span class="loader"></span>';
  fetchCatByBreed(refs.breedSelect.value);
}

function createMarkup(arr) {
  return arr.data.map(
    ({ breeds: [{ name, temperament, description }], url }) => {
      return `
      <img src="${url}" alt="${name}">
<div class='text-container'>
        <h1>${name}</h1>
        <p>${description}</p>
        <span><b>Temperament: </b>${temperament}</span>
</div>
    `;
    }
  );
}
