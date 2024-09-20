import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenNavBar from "./GenNavBar";
import LeftNavBar from "./LeftNavBar";
import JobReq from "./ScreenViews/JobReq";
import JobReqDetail from "./ScreenViews/JobReqDetail";
import Dashboard from "./ScreenViews/Dashboard";
import Approvals from "./ScreenViews/Approvals";
import CV_Screening from "./ScreenViews/CV_Screening";
import Profile_Post from "./ScreenViews/Profile_Post";
import CandidateScreening from "./ScreenViews/CandidateScreening";
import Talent_Test from "./ScreenViews/Talent_Test";
import Policies from "./ScreenViews/Policies";
import Prescreening from "./ScreenViews/Prescreening";
import HiringPage from "./ScreenViews/HiringPage";
import ExternalHiring from "./ScreenViews/ExternalHiring"
import TestPage from "./TestPage";

function MainScreen() {
  const [formDataObject, setFormDataObject] = useState({});

  const onFormDataSubmit = (key, newFormData) => {
    // Update formDataObject state with new form data
    setFormDataObject((prevObject) => {
      const updatedObject = {
        ...prevObject,
        [key]: newFormData,
      };

      // Save the updated formDataObject to session storage
      sessionStorage.setItem("jobReqFormData", JSON.stringify(updatedObject));

      return updatedObject;
    });
  };

  return (
    <Router>
      <div className="grid-container">
        <GenNavBar />
        <LeftNavBar />
        <div className="form-container">
          <div className="main-content">
            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard formDataObject={formDataObject} />}
              />
              <Route
                path="/job-req"
                element={<JobReq onFormDataSubmit={onFormDataSubmit} />}
              />
              <Route
                path="/jobreq/:requisition_id"
                element={<JobReqDetail />}
              />
              <Route
                path="/approvals/:requisition_id"
                element={<Approvals />}
              />
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/cvscreening" element={<CV_Screening />} />
              <Route path="/profilepost" element={<Profile_Post />} />
              <Route
                path="/candidates"
                element={<CandidateScreening formDataObject={formDataObject} />}
              />
              <Route path="/talenttest" element={<Talent_Test />} />
              <Route path="/prescreening" element={<Prescreening />} />
              <Route
                path="/prescreening/:candidateId"
                element={<Prescreening />}
              />
              <Route path="/policies" element={<Policies />} />
              <Route path="/HiringPage" element={<HiringPage />} />
              <Route path="/ExternalHiring" element={<ExternalHiring />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/users/entry-assessment" element={<TestPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default MainScreen;
