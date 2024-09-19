import { Form } from "react-bootstrap";
import { axios } from "./index";

const APP_BASE_API_URL = 'http://localhost:4000/approval';

const insertApprovalData = async (params, successCallback, failureCallback) => {
    const apiURL = APP_BASE_API_URL + "/submit";

    axios.post(apiURL, params).then((res) => {
        successCallback(res);
        console.log(res.data);
    }).catch((error) => {
        failureCallback(error);
    });
};

const fetchByApprovals = async (requisitionId, successCallback, failureCallback) => {
    const apiURL = `${APP_BASE_API_URL}/fetchByApprovals?jobReqId=${requisitionId}`;

    console.log(apiURL);

    axios.get(apiURL).then((res) => {
        const approval = res.data.find(item => item.jobReqId === requisitionId);
        if (approval) {
            successCallback(approval.approvalId);
            console.log(approval.approvalId);
        } else {
            failureCallback(new Error('No approval found for the specified jobReqId'));
        }
    }).catch((error) => {
        failureCallback(error);
    });
};

export default {
    insertApprovalData,
    fetchByApprovals
};