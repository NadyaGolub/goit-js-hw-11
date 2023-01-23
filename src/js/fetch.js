import axios from 'axios';
// https://pixabay.com/api/

    const BASE_URL = `https://pixabay.com/api/`;
    const KEY = `32971749-6f722df3241990952229e902a`;
   

export const fetchImage = async (value, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: KEY,
      q: `${value}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 30,
      page: `${page}`,
    },
  });

  return response.data;
};