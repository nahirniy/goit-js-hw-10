import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_XjUFqatMvc2i9HMpG4LqtCqPOLkyzgz1ErJg7rm9vFFWwJ0yGGjMGWDtg0FF3ep5';

const BASE_URL = `https://api.thecatapi.com/v1`;

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(resp => resp.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(resp => resp.data[0]);
}
