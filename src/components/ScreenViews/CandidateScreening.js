import React, { useState, useEffect } from "react";

import { Pagination, Table, Button, Form, Modal } from "react-bootstrap";

import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

import axios from "axios"; // Import axios for making API requests

//import resume from '../../views/img/resume';

// import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function CandidateScreening() {
  const [candidates, setCandidates] = useState([]); // State for storing candidates data

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 25; // Items per page

  const [selectedCandidate, setSelectedCandidate] = useState(null); // Define selectedCandidate state

  const [showModal, setShowModal] = useState(false);

  const [result, setResult] = useState("");

  const [confirmCandidateName, setConfirmCandidateName] = useState(null);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  //   const handleModalConfirm = async (status, result) => {
  //     try {
  //       if (!selectedCandidate) return;

  //       await handleStatusChange(selectedCandidate, status);

  //       setShowModal(false);
  //       setShowReviewModal(false);
  //       setShowRejectModal(false);
  //     } catch (error) {
  //       console.error("Error handling confirmation:", error);
  //     }
  //   };

  //   const handleSelectedClick = () => {
  //     if (selectedCandidate) {
  //       handleModalConfirm("selected", "selected");
  //       setShowModal(true);
  //     }
  //   };

  //   const handleReviewClick = () => {
  //     if (selectedCandidate) {
  //       handleModalConfirm("Profile Reviewed", "Profile Reviewed");
  //       setShowReviewModal(true);
  //     }
  //   };

  //   const handleRejectClick = () => {
  //     if (selectedCandidate) {
  //       handleModalConfirm("Rejected", "Rejected");
  //       setShowRejectModal(true);
  //     }
  //   };

  //   const handleStatusChange = async (candidate, newStatus) => {
  //     if (!candidate) return; // Check if candidate is null or undefined

  //     try {
  //       const response = await axios.put(
  //         `http://localhost:4000/approval/${candidate.approvalId}/selectionStatus?selectionStatus=${newStatus}`,
  //         {
  //           selectionStatus: newStatus,
  //         }
  //       );

  //       // Assuming the response contains the updated selection status
  //       const updatedCandidate = {
  //         ...candidate,
  //         selection: newStatus,
  //       };

  //       console.log(response.data);

  //       // Update the selection status of the selected candidate in state
  //       setCandidates((prevCandidates) =>
  //         prevCandidates.map((c) =>
  //           c.approvalId === candidate.approvalId
  //             ? { ...c, selection: newStatus }
  //             : c
  //         )
  //       );
  //     } catch (error) {
  //       console.error("Error updating candidate status:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     const fetchApprovalData = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:4000/approval/fetchByApprovals"
  //         );
  //         console.log(response);
  //         const approvalData = response.data.map((candidate) => ({
  //           currentCompany: "Apple",
  //           currentDesignation: "Software Developer",
  //           experience: "5",
  //           resume: "Download", // Hardcoded for now
  //           approvalId: candidate.approvalId,
  //           selection: candidate.selectionStatus,
  //           interviewStatus: candidate.interviewStatus,
  //           jobReqId: candidate.jobReqId, // Adding jobReqId to match with candidate data
  //         }));
  //         return approvalData;
  //       } catch (error) {
  //         console.error("Error fetching approval data:", error);
  //         return [];
  //       }
  //     };

  const fetchCandidateData = () => {
    try {
      // const response = await axios.get(
      //   "http://localhost:4000/candidate/fetch"
      // );
      const data = [
        {
          name: "Rakesh Sharma",
          email: "rakesh.sharmaji@gmail.com",
          currentDesignation: "Project Manager",
          source: 'External Agency',
          experience: 9,
          dateOfApplication: "2024-08-16",
          status: 'Next round pending',
          team:'KM Easy Mode',
        },
        {
          name: "Ananya Sharma",
          email: "ananya.sharma@gmail.com",
          currentDesignation: "Software Engineer",
          experience: 5,
          source: 'Employee Referral',
          dateOfApplication: "2024-09-15",
          team:'Cloud MES',
          status: 'Next round pending',
        },
        {
          name: "Rohan Mehta",
          email: "rohan.mehta@gmail.com",
          currentDesignation: "Project Manager",
          source: 'Employee Referral',
          experience: 8,
          dateOfApplication: "2024-09-16",
          status: 'Next round pending',
          team:'SCMP',
        },
        {
          name: "Karan Patel",
          email: "karan.patel@gmail.com",
          currentDesignation: "Data Analyst",
          source: 'External Agency',
          experience: 3,
          dateOfApplication: "2024-09-17",
          status: 'Selected',
          team:'Tech Support',
        },
        {
          name: "Neha Iyer",
          email: "neha.iyer@gmail.com",
          currentDesignation: "UX Designer",
          source: 'Employee Referral',
          experience: 4,
          dateOfApplication: "2024-09-18",
          status: 'Next round pending',
          team:'IDE Analyser',
        },
        {
          name: "Priya Singh",
          email: "priya.singh@gmail.com",
          currentDesignation: "DevOps",
          source: 'External Agency',
          experience: 6,
          dateOfApplication:"2024-09-18",
          status: 'Rejected',
          team:'O9 Solutions',
        }]      

      //   const candidateData = data.map((candidate) => ({
      //     name: candidate.name,
      //     email: candidate.email,
      //     dateOfApplication: candidate.dateOfApplication,
      //     // jobReqId: candidate.jobReqId, // Adding jobReqId to match with approval data
      //   }));
      //   return candidateData;
      setCandidates(data);

      //   return data;
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      return [];
    }
  };

  //   const fetchData = async () => {
  //     // const approvalData = await fetchApprovalData();
  //     const candidateData = fetchCandidateData();

  //   };

  useEffect(() => {
    fetchCandidateData();
  }, []);

  const handleResumeDownload = (candidateName) => {
    console.log("Downloading resume for candidate: " + candidateName);

    // const resumeFilePath = `{process.env.PUBLIC_URL}/BobSmith.pdf`;
    // // ${candidateName
    // //   .split()
    // //   .join()}.pdf
    // //   `; // Modify this path as needed

    // const a = document.createElement("a");
    // a.href = resumeFilePath;
    // a.download = `BobSmith.pdf`; // Include candidate's name in the filename
    // a.style.display = "none";

    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);

    const resumeFilePath = `${process.env.PUBLIC_URL}/BobSmith.pdf`;
    saveAs(resumeFilePath, "BobSmith.pdf");
  };

  //   const handleExportToExcel = () => {
  //     const table = document.querySelector("table");
  //     const csv = [];
  //     const rows = table.querySelectorAll("tbody tr");

  //     // Extract headers
  //     const headers = [];
  //     table.querySelectorAll("thead th").forEach((headerCell, index) => {
  //       // Skip the "Select" header
  //       if (index !== 1) {
  //         headers.push(headerCell.textContent.trim());
  //       }
  //     });
  //     console.log("Headers: ", headers); // Debugging statement
  //     csv.push(headers.join(","));

  //     // Extract data rows
  //     rows.forEach((row, rowIndex) => {
  //       const rowData = [];
  //       row.querySelectorAll("td").forEach((cell, cellIndex) => {
  //         // Skip the "Select" column
  //         if (cellIndex !== 1) {
  //           rowData.push('"' + cell.textContent.trim().replace(/"/g, '""') + '"');
  //         }
  //       });
  //       console.log(`Row ${rowIndex + 1} Data: `, rowData); // Debugging statement
  //       csv.push(rowData.join(","));
  //     });

  //     // Create the CSV content
  //     const csvContent = "data:text/csv;charset=utf-8," + csv.join("\n");
  //     console.log("CSV Content: ", csvContent); // Debugging statement

  //     // Create a temporary anchor element
  //     const link = document.createElement("a");
  //     link.setAttribute("href", encodeURI(csvContent));
  //     link.setAttribute("download", "candidates.csv");
  //     link.style.display = "none";

  //     // Append the anchor element to the body and simulate a click
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   };
  // Handle pagination changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const currentPageData = candidates.slice(startIndex, endIndex);

  console.log("Current page data:", currentPageData);

  return (
    <div style={{ padding: "5px" }}>
      <h3 style={{ marginBottom: "20px", color: "#343a40", fontSize: "15px" }}>
        Candidate Dashboard
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        {/* Buttons for changing candidate status */}
        {/* <div>
          <Button
            style={{
              marginRight: "10px",
              fontSize: "16px",
              padding: "5px 10px",
            }}
            onClick={handleReviewClick}
            disabled={!selectedCandidate}
          >
            Profile Review
          </Button>
          <Button
            style={{
              marginRight: "10px",
              fontSize: "16px",
              padding: "5px 10px",
            }}
            onClick={handleSelectedClick}
            disabled={!selectedCandidate}
          >
            Selection for Assessment
          </Button>
          <Button
            style={{
              marginRight: "10px",
              fontSize: "16px",
              padding: "5px 10px",
            }}
            onClick={handleRejectClick}
            disabled={!selectedCandidate}
          >
            Rejected
          </Button>
        </div> */}
      </div>

      {/* Modal for confirming selection */}
      {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to select this candidate?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => handleModalConfirm("selected")}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* Modal for confirming profile review */}
      {/* <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Profile Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to mark this candidate's profile as reviewed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => handleModalConfirm("Profile Reviewed")}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* Modal for confirming rejection */}
      {/* <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to reject this candidate?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => handleModalConfirm("Rejected")}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* Display the data in table format */}
      <Table
        id="candidates-table"
        responsive
        bordered
        hover
        style={{ width: "100%", border: "1px solid #ddd", fontSize: "12px" }}
      >
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr>
            <th style={{ whiteSpace: "nowrap" }}>#</th>
            {/* <th style={{ whiteSpace: "nowrap" }}>Select</th> */}
            <th style={{ whiteSpace: "nowrap" }}>Name</th>
            <th style={{ whiteSpace: "nowrap" }}>Email</th>
            {/* <th style={{ whiteSpace: "nowrap" }}>Current Company</th> */}
            <th style={{ whiteSpace: "nowrap" }}>Position</th>
            <th style={{ whiteSpace: "nowrap" }}>Years of Experience</th>
            <th style={{ whiteSpace: "nowrap" }}>Source</th>
            <th style={{ whiteSpace: "nowrap" }}>Team</th>
            <th style={{ whiteSpace: "nowrap" }}>Date of Application</th>
            <th style={{ whiteSpace: "nowrap" }}>Application Status</th>
            <th style={{ whiteSpace: "nowrap" }}>Resume</th>
            {/* <th style={{ whiteSpace: "nowrap" }}>Requisition ID</th> */}
            {/* <th style={{ whiteSpace: "nowrap" }}>Approval Submitted ID</th> */}
            {/* <th style={{ whiteSpace: "nowrap" }}>Selection</th> */}
            {/* <th style={{ whiteSpace: "nowrap" }}>Action</th>{" "} */}
            {/* New Action column */}
            {/* <th style={{ whiteSpace: "nowrap" }}>Current Status</th>{" "} */}
            {/* New Action column */}
          </tr>
        </thead>
        <tbody>
          {/* Generate the rows from the form data */}
          {currentPageData.map((candidate, rowIndex) => (
            <tr key={rowIndex}>
              {/* Add a Form.Check radio button in the first column */}
              {/* <td style={{ padding: "5px", textAlign: "center" }}>
                <Form.Check
                  type="radio"
                  name="candidateSelection"
                  value={candidate.approvalId}
                  checked={
                    selectedCandidate &&
                    candidate.approvalId === selectedCandidate.approvalId
                  }
                  onChange={() => setSelectedCandidate(candidate)}
                />
              </td> */}
              <td style={{ padding: "5px", textAlign: "center" }}>
                {startIndex + rowIndex + 1}
              </td>
              <td
                style={{
                  padding: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.name}
              </td>
              <td
                style={{
                  padding: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.email}
              </td>
              {/* <td
                style={{
                  padding: "5px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.currentCompany}
              </td> */}
              <td
                style={{
                  padding: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.currentDesignation}
              </td>
              <td
                style={{
                  padding: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.experience}
              </td>

              <td
                style={{
                  padding: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.source}
              </td>

              <td
                style={{
                  padding: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.team}
              </td>

              <td
                style={{
                  padding: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.dateOfApplication}
              </td>

              <td
                style={{
                  padding: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.status}
              </td>

              <td
                style={{
                  padding: "5px",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                <Button
                  variant="link"
                  onClick={() => handleResumeDownload(candidate.name)} // Pass the candidate's name
                  style={{ fontSize: "12px", padding: "5px" }}
                >
                  Download
                </Button>
              </td>
              {/* <td
                style={{
                  padding: "5px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.jobReqId}
              </td> */}
              {/* <td
                style={{
                  padding: "5px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.approvalId}
              </td> */}
              {/* <td
                style={{
                  padding: "5px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.selection}
              </td> */}
              {/* Conditionally render the Action column only if the selection is "selected" */}
              {/* <td style={{ padding: "5px", textAlign: "center" }}>
                {candidate.selection === "selected" ? (
                  <Link to={`/prescreening/${candidate.jobReqId}`}>
                    Interview Scheduler
                  </Link>
                ) : (
                  "" // Empty string when the selection is not "selected"
                )}
              </td> */}
              {/* <td
                style={{
                  padding: "5px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {candidate.interviewStatus}
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination controls */}
      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({
          length: Math.ceil(candidates.length / itemsPerPage),
        }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(candidates.length / itemsPerPage)}
        />
        <Pagination.Last
          onClick={() =>
            handlePageChange(Math.ceil(candidates.length / itemsPerPage))
          }
          disabled={currentPage === Math.ceil(candidates.length / itemsPerPage)}
        />
      </Pagination>
    </div>
  );
}

export default CandidateScreening;
