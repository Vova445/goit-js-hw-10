import axios from 'axios';
const CATS_URL = 'https://api.thecatapi.com/v1/breeds';
axios.defaults.headers.common['x-api-key'] = 'live_mI6LUQ2enmzcq4zLkkMN7ocuuKBZP22oz5U4YwbO8hFlVapQXu6oo54orzp0TeF0';
axios.defaults.baseURL = CATS_URL;

export function getBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

export function getCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
    return resp.data;
  });
}
