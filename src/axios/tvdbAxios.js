import axios from 'axios';

const tvdbAxios = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.thetvdb.com'
});

export default tvdbAxios;