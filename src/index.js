import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
const elements = {
  select: document.getElementById('breed-select'),
  info: document.getElementById('cat-info'),
  loader: document.getElementById('loader'),
  error: document.getElementById('error'),
};
elements.loader.classList.add('is-hidden');
elements.error.classList.add('is-hidden');
elements.info.classList.add('is-hidden');
function fetchList() {
  fetchBreeds()
    .then(breeds => {
      const breedOptions = breeds.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      }).join('');
      elements.select.insertAdjacentHTML('beforeend', breedOptions);
      new SlimSelect({
        select: elements.select,
        placeholder: 'Select a breed',
      });
    })
    .catch(onError);
}
fetchList();
elements.select.addEventListener('change', onSelect);
function onSelect(evt) {
  evt.preventDefault();
  const selectedBreedId = evt.target.value;
  displayLoader();
  fetchCatInfo(selectedBreedId);
}
function fetchCatInfo(breedId) {
  fetchCatByBreed(breedId)
    .then(catInfo => {
      const selectedBreed = catInfo[0];
      displayCatInfo(selectedBreed);
    })
    .catch(onError);
}
function displayCatInfo(catData) {
  const { description, temperament, name } = catData;
  const catInfoMarkup = `
    <div class="cat">
      <div class="cat__img">
        <img src="${catData.url}" alt="cat" width="500" />
      </div>
      <div class="cat__info-txt">
        <h1 class="cat__info-title">${name}</h1>
        <p class="cat__info-description">${description}</p>
        <p class="cat__info-temperament"><span>Temperament:</span> ${temperament}</p>
      </div>
    </div>`;
  elements.info.innerHTML = catInfoMarkup;
  displayCatInfoSection();
}
function onError(error) {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  console.log(error);
}
function displayCatInfoSection() {
  elements.loader.classList.add('is-hidden');
  elements.error.classList.add('is-hidden');
  elements.info.classList.remove('is-hidden');
}
function displayLoader() {
  elements.loader.classList.remove('is-hidden');
  elements.info.classList.add('is-hidden');
  elements.error.classList.add('is-hidden');
}
