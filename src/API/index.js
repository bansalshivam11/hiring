import axios from 'axios';

let instance = createInstance();

function createInstance(){
    const instance = axios.create();
    instance.defaults.baseURL = "http://localhost:4000";
    return instance;
}

export { instance as axios };