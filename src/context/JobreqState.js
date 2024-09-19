import React, { useState } from "react";
import jobreqContext from "./jobreqContext";

const JobreqState = (props) => {

    const host="http://localhost:4000";
    const jobreqInitial = [];
    const [jobreq, setJobreq] = useState(jobreqInitial);
  
    const getJobreq= async()=>{

        //API Control
    //API Call

    const response =await fetch(`${host}/candidate/fetch`,{ method:'GET',
    headers:{'Content-Type':'application/json',
            
    },
 });

 const json = await response.json()
    //console.log(json);
    setJobreq(json);
     }

    return (
        <jobreqContext.Provider value={{getJobreq}}>
            {props.children}
        </jobreqContext.Provider>
    );
}

export default JobreqState;