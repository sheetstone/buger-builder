import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-2d973.firebaseio.com/'
});

export default instance;