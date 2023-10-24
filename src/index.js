import { getBreeds, getCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedBreedId = '';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

elements.loader.classList.add('is-hidden');
elements.error.classList.add('is-hidden');
elements.catInfo.classList.add('is-hidden');

function fillBreedSelect() {
  getBreeds()
    .then(breeds => {
      const breedOptions = breeds.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      }).join('');
      elements.breedSelect.insertAdjacentHTML('beforeend', breedOptions);

      new SlimSelect({
        select: elements.breedSelect,
      });
    })
    .catch(handleError);
}

fillBreedSelect();

elements.breedSelect.addEventListener('change', handleBreedSelect);

function handleBreedSelect(evt) {
  evt.preventDefault();
  displayLoader();
  selectedBreedId = evt.target.value;
  displayCatInfo(selectedBreedId);
}

function displayCatInfo(breedId) {
  let selectedBreed;

  getBreeds()
    .then(data => {
      selectedBreed = data.find(breed => breed.id === breedId);
      return getCatByBreed(breedId);
    })
    .then(catInfo => {
      const catData = catInfo[0];
      const { description, temperament, name } = selectedBreed;
      const { url } = catData;

      const catInfoMarkup = `
        <div class="cat">
          <div class="cat__img">
            <img src="${url}" alt="cat" width="500" />
          </div>
          <div class="cat__info-txt">
            <h1 class="cat__info-title">${name}</h1>
            <p class="cat__info-description">${description}</p>
            <p class="cat__info-temperament"><span>Temperament:</span> ${temperament}</p>
          </div>
        </div>`;

      elements.catInfo.innerHTML = catInfoMarkup;
      displayCatInfoSection();
    })
    .catch(handleError);
}

function handleError(error) {
  Notiflix.Notify.warning('Oops! Something went wrong! Try reloading the page!');
  console.log(error);
}

function displayCatInfoSection() {
  elements.loader.classList.add('is-hidden');
  elements.catInfo.classList.remove('is-hidden');
}

function displayLoader() {
  elements.loader.classList.remove('is-hidden');
  elements.catInfo.classList.add('is-hidden');
}
