import axios from 'axios';
import { refs } from './index';
import { createMarkup } from './index';
import { Notify } from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_zFksffvjV5C1VI3jqdVkoP6lGz4eQnTFRekdHtefmwojLFX28yJABEnBPGHJIB1T';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

async function fetchBreeds() {
  return data = await axios
    .get('/breeds')
    .then(resp => resp.data.map(data => data))
    .catch(err => {
      console.error(err);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      refs.catInfo.innerHTML = '';
    })
}

async function fetchCatByBreed(breedId) {
  return data = await axios
    .get('/images/search', {
      params: {
        breed_ids: breedId,
      },
    })
    .then(resp => (refs.catInfo.innerHTML = createMarkup(resp)))
    .catch(err => {
      console.error(err);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      refs.catInfo.innerHTML = '';
    })
}

export { fetchBreeds, fetchCatByBreed };
