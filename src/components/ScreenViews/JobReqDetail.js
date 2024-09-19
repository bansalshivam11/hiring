import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import FileUploadComponent from "../FileSelect";

// JobServiceData.js (Mock Service)
const JobServiceData = {
  getJobDataById: (requisition_id, onSuccess, onError) => {
    // Dummy job data
    const jobData = {
      101: {
        jobReqId: 101,
        candidateRequisitionType: "New Hire",
        candidateRecruitmentType: "Internal",
        isCandidateReplacement: "No",
        candidateReplacementName: "",
        candidateRequisitionStatus: "Open",
        numberOfOpening: 2,
        hiringLocation: "Remote",
        isConfidentialHire: "No",
        confidentialReason: "",
        candidateTeam: "Engineering",
        candidateGroup: "Frontend Team",
        candidateHiringManager: "John Doe",
        candidateJobTitle: "Frontend Developer",
        candidateShiftTiming: "Full-time",
        candidateJD: "Responsible for developing UI components.",
        candidateRemarks: "Urgent hiring for Q4 projects",
        descriptionFooter: "Experience in React is required",
        empId: "EMP123",
        knoxId: "KNOX456",
      },
      102: {
        jobReqId: 102,
        candidateRequisitionType: "Replacement",
        candidateRecruitmentType: "External",
        isCandidateReplacement: "Yes",
        candidateReplacementName: "Jane Doe",
        candidateRequisitionStatus: "Closed",
        numberOfOpening: 1,
        hiringLocation: "New York",
        isConfidentialHire: "No",
        confidentialReason: "",
        candidateTeam: "Backend Team",
        candidateGroup: "API Services",
        candidateHiringManager: "Alice Smith",
        candidateJobTitle: "Backend Developer",
        candidateShiftTiming: "Full-time",
        candidateJD: "Develop APIs for the system.",
        candidateRemarks: "Replacement for a senior role",
        descriptionFooter: "Good knowledge of Node.js and databases required",
        empId: "EMP124",
        knoxId: "KNOX457",
      },
    };

    const data = jobData[requisition_id];

    if (data) {
      onSuccess(data);
    } else {
      onError({ message: "Job requisition not found" });
    }
  },
};

//   export default JobServiceData;

// ApprovalService.js (Mock Service)
const ApprovalService = {
  fetchByApprovals: (requisition_id, onSuccess, onError) => {
    // Dummy approval data
    const approvalData = {
      101: "APPROVAL123",
      102: "APPROVAL124",
    };

    const approvalId = approvalData[requisition_id];

    if (approvalId) {
      onSuccess(approvalId);
    } else {
      onError({ message: "No approval found for this requisition" });
    }
  },

  insertApprovalData: (paramData, onSuccess, onError) => {
    console.log("Inserting approval data", paramData);
    if (paramData.jobReqId) {
      onSuccess({
        data: {
          approvalId: "APPROVAL125",
        },
      });
    } else {
      onError({ message: "Failed to insert approval data" });
    }
  },
};

//   export default ApprovalService;

// JobReqDetail.js (Main Component)

//   import JobServiceData from '../../API/DashboardRestService';
//   import ApprovalService from '../../API/ApprovalRestService';

function JobReqDetail() {
  const { requisition_id } = useParams();
  const navigate = useNavigate();
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [approvalId, setApprovalId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [approvers, setApprovers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch job data for the specified requisition ID
    JobServiceData.getJobDataById(
      requisition_id,
      (data) => {
        setFormData(data);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [requisition_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (formData) {
          ApprovalService.fetchByApprovals(
            requisition_id,
            (approvalId) => {
              setApprovalId(approvalId);
              console.log(`Approval ID set: ${approvalId}`);
            },
            (error) => {
              setError(error);
              console.log(error);
            }
          );
        }
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchData();

    return () => {
      // Clean-up code (if any)
    };
  }, [formData, requisition_id]);

  const handleConfirmSubmit = () => {
    const paramData = {
      approvalTitle: title,
      emailAddresses: approvers,
      approvalMessage: message,
      jobReqId: requisition_id,
    };

    ApprovalService.insertApprovalData(
      paramData,
      (data) => {
        if (data && data.data && data.data.approvalId) {
          setApprovalId(data.data.approvalId);
          setShowSubmissionModal(true);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const toggleFileUpload = () => {
    setShowFileUpload(!showFileUpload); // Toggle the visibility
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = () => {
    setShowConfirmModal(false);
    navigate(`/approvals/${requisition_id}`);
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      label: "Candidate Requisition Type",
      value: formData.candidateRequisitionType,
    },
    {
      label: "Candidate Recruitment Type",
      value: formData.candidateRecruitmentType,
    },
    {
      label: "Is Candidate Replacement",
      value: formData.isCandidateReplacement,
    },
    { label: "Replacement Name", value: formData.candidateReplacementName },
    { label: "Requisition Status", value: formData.candidateRequisitionStatus },
    { label: "Number of Opening", value: formData.numberOfOpening },
    { label: "Hiring Location", value: formData.hiringLocation },
    { label: "Is Confidential Hire", value: formData.isConfidentialHire },
    { label: "Confidential Reason", value: formData.confidentialReason },
    { label: "Candidate Team", value: formData.candidateTeam },
    { label: "Candidate Group", value: formData.candidateGroup },
    {
      label: "Candidate Hiring Manager",
      value: formData.candidateHiringManager,
    },
    { label: "Candidate Job Title", value: formData.candidateJobTitle },
    { label: "Candidate Shift Timing", value: formData.candidateShiftTiming },
    { label: "Candidate JD", value: formData.candidateJD },
    { label: "Candidate Remarks", value: formData.candidateRemarks },
    { label: "Description Footer", value: formData.descriptionFooter },
  ];

  return (
    <div
      className="main-container"
      style={{ padding: "15px", fontSize: "14px" }}
    >
      <h3 style={{ marginBottom: "20px", color: "#343a40", fontSize: "16px" }}>
        Job Requisition Detail
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="requisition_id" style={{ marginBottom: "10px" }}>
          <Form.Label style={{ fontSize: "15px" }}>
            Job Requisition ID
          </Form.Label>
          <Form.Control
            type="text"
            value={formData.jobReqId}
            readOnly
            style={{ fontSize: "14px", width: "250px" }}
          />
        </Form.Group>

        <Form.Group
          controlId="requisition_status"
          style={{ marginBottom: "20px" }}
        >
          <Form.Label style={{ fontSize: "15px" }}>
            Requisition Status
          </Form.Label>
          <Form.Control
            type="text"
            value={formData.candidateRequisitionStatus}
            readOnly
            style={{ fontSize: "14px", width: "250px" }}
          />
        </Form.Group>

        {columns.map((field, index) => (
          <Form.Group
            key={index}
            controlId={field.label}
            style={{ marginBottom: "10px" }}
          >
            <Form.Label style={{ fontSize: "15px" }}>{field.label}</Form.Label>
            <Form.Control
              type="text"
              value={field.value}
              readOnly
              style={{ fontSize: "14px", width: "250px" }}
            />
          </Form.Group>
        ))}
        <div style={{ padding: "20px" }}>
          <Button variant="primary" onClick={toggleFileUpload}>
            {showFileUpload ? "Hide File Upload" : "Upload File"}
          </Button>

          {showFileUpload && (
            <div style={{ marginTop: "20px" }}>
              <FileUploadComponent />
            </div>
          )}
        </div>
      </Form>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Move to Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to move this job requisition to approval?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSubmissionModal}
        onHide={() => setShowSubmissionModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Approval Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The approval has been successfully submitted. Here is the Approval ID:{" "}
          {approvalId}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmUpdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JobReqDetail;
