import axios from "axios"; // Corrected import statement

const CAN_BASE_API_URL='http://localhost:4000/candidate';

const getJobDataById = async (successCallBack, failureCallBack) => {
    const apiURI = CAN_BASE_API_URL + "/jobId";

    axios.get(apiURI)
        .then((res) => {
            successCallBack(res.data);
        })
        .catch((error) => {
            failureCallBack(error);
        });
};

export default {
    getJobDataById
};