import axios from 'axios';

const seriesAxios = axios.create({
    baseURL: 'https://personal-media-assistent.firebaseio.com/'
});

export default seriesAxios;