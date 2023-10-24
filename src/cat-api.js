import axios from "axios";
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_mI6LUQ2enmzcq4zLkkMN7ocuuKBZP22oz5U4YwbO8hFlVapQXu6oo54orzp0TeF0';

export function fetchBreeds() {
   return axios
        .get(`${BASE_URL}/breeds?key=${API_KEY}`)
        .then(resp => resp.data)
        
    }
    
export function fetchCatByBreed(breedId) {
return axios
   .get(`${BASE_URL}/images/search?key=${API_KEY}&breed_ids=${breedId}`)
        .then(resp =>  resp.data)
}