import axios from "axios";

const CAN_BASE_API_URL = 'http://localhost:4000/candidate';

const getJobData = async (successCallBack, failureCallBack) => {
    const apiURI = CAN_BASE_API_URL + "/fetch";

    try {
        const res = await axios.get(apiURI);
        successCallBack(res.data);
    } catch (error) {
        if (typeof failureCallBack === 'function') {
            failureCallBack(error);
        }
    }
};

const getJobDataById = async (requisitionId, successCallBack, failureCallBack) => {
    //const apiURI = `${CAN_BASE_API_URL}/fetch?jrId=${requisitionId}`;

    const apiURI =`${CAN_BASE_API_URL}/jobId?jrId=${requisitionId}`;

    try {
        const res = await axios.get(apiURI);
        successCallBack(res.data);
    } catch (error) {
        if (typeof failureCallBack === 'function') {
            failureCallBack(error);
        }
    }
};

export default {
    getJobData,
    getJobDataById
};