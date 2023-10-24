import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_mI6LUQ2enmzcq4zLkkMN7ocuuKBZP22oz5U4YwbO8hFlVapQXu6oo54orzp0TeF0';

axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.baseURL = BASE_URL;

export function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
    return resp.data;
  });
}