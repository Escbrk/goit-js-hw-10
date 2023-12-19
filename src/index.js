import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';

// new SlimSelect({
//   select: '#selectElement',
// });

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};

axios.defaults.headers.common['x-api-key'] =
  'live_zFksffvjV5C1VI3jqdVkoP6lGz4eQnTFRekdHtefmwojLFX28yJABEnBPGHJIB1T';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

async function fetchBreeds() {
  const data = await axios
    .get('/breeds')
    .then(resp => resp.data.map(data => data))
    .catch(err => console.error(err));
  return data;
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


// function fetchCatByBreed(breedId) {

//   }

refs.breedSelect.addEventListener('change', onSelect)

function onSelect() {
    console.log(refs.breedSelect.value)
}