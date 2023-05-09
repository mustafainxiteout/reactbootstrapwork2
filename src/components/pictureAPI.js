import axios from 'axios';

export const getpic = () => {
  // Get the access token from wherever it is stored (e.g. local storage, Redux store, etc.)
  const localaccessToken = localStorage.getItem('access_token');
  const sessionaccessToken = sessionStorage.getItem('access_token');
  const token = localaccessToken || sessionaccessToken;
  return axios.get('/picture/profile-picture', {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      const imageObjectURL = URL.createObjectURL(response.data);
      return imageObjectURL;
    })
    .catch(error => console.log(error));
};