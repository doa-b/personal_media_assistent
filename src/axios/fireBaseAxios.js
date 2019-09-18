import axios from 'axios';

const fireBaseAxios = axios.create({
    baseURL: 'https://personal-media-assistent.firebaseio.com/'
    // https://cors-anywhere.herokuapp.com/
});

export default fireBaseAxios;