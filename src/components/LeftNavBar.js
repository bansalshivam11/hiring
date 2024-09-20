import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import logo from "../views/img/Samsung-Logo.png";
import dashboard from "../views/img/dashboard-icon.png";
import job_req from "../views/img/job_req.png";
import approval from "../views/img/approval.png";
import candidates from "../views/img/candidates.png";
import prescreening from "../views/img/pre-screening.png";
import cvscreening from "../views/img/cv-screening.png";
import pupload from "../views/img/pupload.png";
import test from "../views/img/test.png";
import entry from "../views/img/entry.png";
import code from "../views/img/code.png";
import company from "../views/img/company.png";

function LeftNavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [settingNavbarHeight, setSettingNavbarHeight] = useState(0);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };
  return (
    <div className="sidebar">
      {/* Company logo and text link */}
      <a href="/dashboard" className="brand-link">
        <img
          src={logo}
          alt="Company Logo"
          className="brand-logo"
          style={{ width: "100px", height: "50px", marginRight: "5px" }}
        />
        <p
          className="brand-text"
          style={{ fontSize: "17px", letterSpacing: "1.5px", margin: "0" }}
        >
          Auto Hire
        </p>
      </a>

      <Nav className="flex-column">
        {/* Use React Bootstrap Nav.Link and set the as prop to NavLink */}
        <Nav.Link
          as={NavLink}
          to="/dashboard"
          style={{ fontSize: "15px", padding: "10px" }}
        >
          <img
            src={dashboard}
            alt="Dashboard"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Job Dashboard
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/job-req"
          style={{ fontSize: "15px", padding: "10px" }}
        >
          <img
            src={job_req}
            alt="Job Requisition"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Create Job opening
        </Nav.Link>
        {/* <Nav.Link as={NavLink} to="/approvals" style={{ fontSize: '15px', padding: '10px' }}>
                    <img src={approval} alt="Approvals" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                    Approval Workflow
                </Nav.Link> */}
        <Nav.Link
          as={NavLink}
          to="/cvscreening"
          style={{ fontSize: "15px", padding: "10px" }}
        >
          <img
            src={cvscreening}
            alt=" CV Screening"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Auto Screener
        </Nav.Link>
        {/* <Nav.Link
          as={NavLink}
          to="/profilepost"
          style={{ fontSize: "15px", padding: "10px" }}
        >
          <img
            src={pupload}
            alt=" Profile Upload"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Candidate Data Management
        </Nav.Link> */}
        <Nav.Link
          as={NavLink}
          to="/candidates"
          style={{ fontSize: "15px", padding: "10px" }}
        >
          <img
            src={candidates}
            alt="Candidates Screening"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Candidate Dashboard
        </Nav.Link>
        {/* Dropdown */}
        <div
          className="dropdown"
          style={{
            marginTop: `${settingNavbarHeight}px`,
            transition: "margin-top 0.5s ease",
            fontSize: "15px",
          }}
        >
          <Nav.Link
            to="#"
            onClick={toggleDropdown}
            className="dropdown-toggle nav-link"
            style={{
              color: "#fff",
              padding: "12px 10px",
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
              textDecoration: "none",
            }}
          >
            <img
              src={test}
              alt="Talent Test"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            Candidate Evaluation
          </Nav.Link>
          <div
            className={`dropdown-menu ${showDropdown ? "show" : ""}`}
            style={{
              display: "block",
              backgroundColor: "#034EA2",
              fontSize: "15px",
            }}
          >
            <Nav.Link
              as={NavLink}
              to="/users/entry-assessment"
              className="dropdown-item nav-link"
              style={{
                color: "#fff",
                padding: "10px 20px",
                textDecoration: "none",
                fontSize: "15px",
              }}
              onClick={closeDropdown}
            >
              <img
                src={entry}
                alt="Entry"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              Screening & Feedback
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/users/code-competence"
              className="dropdown-item nav-link"
              style={{
                color: "#fff",
                padding: "10px 20px",
                textDecoration: "none",
                fontSize: "15px",
              }}
              onClick={closeDropdown}
            >
              <img
                src={code}
                alt="Entry"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              Interview Round
            </Nav.Link>
          </div>
        </div>
        {/* End Dropdown */}
        <Nav.Link
          as={NavLink}
          to="/prescreening"
          style={{ fontSize: "15px", padding: "10px" }}
        >
          <img
            src={prescreening}
            alt="Pre-Screening"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Interview Scheduler
        </Nav.Link>
        {/* <Nav.Link
          as={NavLink}
          to="/policies"
          style={{ fontSize: "15px", padding: "10px" }}
        >
          <img
            src={company}
            alt="Entry"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          HR Policies and Guidelines
        </Nav.Link> */}
      </Nav>
    </div>
  );
}

export default LeftNavBar;
