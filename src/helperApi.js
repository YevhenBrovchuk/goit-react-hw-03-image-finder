import axios from 'axios';
const key = `38409266-8e635f5f4e198de922f25f7f9`;

export const fetchImg = async (name, page) => {
  const resp = axios.get(
    `https://pixabay.com/api/?q=${
      name.split('/')[1]
    }&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return resp;
};
