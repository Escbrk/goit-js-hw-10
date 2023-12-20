import '../node_modules/modern-normalize/modern-normalize.css';
import './css/style.css'
import { fetchBreeds, fetchCatByBreed } from './cat-api'


export const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};



// Create options markup -->
fetchBreeds().then(data =>
  data.forEach(({ id, name }) =>
    refs.breedSelect.insertAdjacentHTML(
      'beforeend',
      `<option value="${id}">${name}</option>`
    )
  )
);

refs.breedSelect.addEventListener('change', onSelect);

function onSelect() {
  refs.catInfo.innerHTML = '<span class="loader"></span>';
  fetchCatByBreed(refs.breedSelect.value);
}

export function createMarkup(arr) {
  return arr.data.map(
    ({ breeds: [{ name, temperament, description }], url }) => {
      return `
      <div class='container'>
        <img src="${url}" alt="${name}">
  <div class='text-container'>
          <h1>${name}</h1>
          <p>${description}</p>
          <span><b>Temperament: </b>${temperament}</span>
  </div>
      </div>
    `;
    }
  );
}
