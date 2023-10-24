import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

elements.loader.style.display = 'block';
elements.error.style.display = 'none';
elements.catInfo.style.display = 'none';

const slim = new SlimSelect({
  select: elements.select,
  showSearch: false,
});

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      slim.add(breed.id, breed.name);
    });
  })
  .then(() => {
    elements.loader.style.display = 'none';
    elements.select.style.display = 'block';
  })
  .catch(error => {
    elements.loader.style.display = 'none';
    elements.error.style.display = 'block';
    Notiflix.Notify.failure('Oops! Something went wrong. Try reloading the page.');
  });

elements.select.addEventListener('change', onSelect);

function onSelect(event) {
  elements.loader.style.display = 'block';
  elements.catInfo.style.display = 'none';
  const breedId = event.target.value;
  showCat(breedId);
}

function showCat(breedId) {
  fetchCatByBreed(breedId)
    .then(catData => {
      const [cat] = catData;
      const { url } = cat;
      return fetchBreeds()
        .then(breeds => {
          const selectedBreed = breeds.find(breed => breed.id === breedId);
          return { url, selectedBreed };
        });
    })
    .then(({ url, selectedBreed }) => {
      elements.catInfo.innerHTML = `
        <div class="cat">
          <div class="cat__img">
            <img src="${url}" alt="cat" width="500" />
          </div>
          <div class="cat__info-txt">
            <h1 class="cat__info-title">${selectedBreed.name}</h1>
            <p class="cat__info-description">${selectedBreed.description}</p>
            <p class="cat__info-temperament"><span>Temperament:</span> ${selectedBreed.temperament}</p>
          </div>
        </div>
      `;
      elements.loader.style.display = 'none';
      elements.catInfo.style.display = 'block';
    })
    .catch(error => {
      elements.loader.style.display = 'none';
      Notiflix.Notify.failure('Oops! Something went wrong. Try reloading the page.');
      console.log(error);
    });
}
