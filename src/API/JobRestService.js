import {axios} from "./index";



const CAN_BASE_API_URL='http://localhost:4000/candidate';

const insertJobData = async(params,sucesscallBack,failureCallBack) =>{
    
    const apiURI = CAN_BASE_API_URL + "/save"
    
    axios.post(apiURI,params).then((res)=>{
        sucesscallBack(res)
    }).catch((error)=>{
        failureCallBack(error)
    })
}

export default {
    insertJobData
};

