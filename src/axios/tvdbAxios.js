import axios from 'axios';

const tvdbAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
    // https://cors-anywhere.herokuapp.com/
});

export default tvdbAxios;