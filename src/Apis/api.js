import axios from "axios";
export default axios.create({

    baseURL:'https://staging-g-m-s-server.cubeaddis.com',
    // baseURL:'http://127.0.0.1:5004',
});