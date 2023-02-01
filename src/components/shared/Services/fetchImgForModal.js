import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/',
});

const fetchImgForModal = async q => {
  let searchParams = new URLSearchParams({
    q,
  });

  try {
    const { data } = await instance.get(`/?${searchParams}`);
    return data;
  } catch (error) {
    Report.failure('Something went wrong, please try again', error.message);
  }
};

export default fetchImgForModal;
