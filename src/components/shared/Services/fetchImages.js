import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '24184422-7ac6228a100fdcdf4ac5fc803',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

const fetchImages = async (q, page, per_page) => {
  let searchParams = new URLSearchParams({
    q,
    page,
    per_page,
  });

  try {
    const { data } = await instance.get(`/?${searchParams}`);
    return data;
  } catch (error) {
    Report.failure('Something went wrong, please try again', error.message);
  }
};

export default fetchImages;
