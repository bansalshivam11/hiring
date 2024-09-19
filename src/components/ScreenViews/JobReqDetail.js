import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import JobServiceData from '../../API/DashboardRestService'; // Import the API service
import ApprovalService from '../../API/ApprovalRestService'; // Import the Approval API service


function JobReqDetail() {
    const { requisition_id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [status, setStatus] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);
    const [approvalId, setApprovalId] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to manage loading status
    const [error, setError] = useState(null); // State to manage errors


    // Define additional state variables needed for approval submission
    const [title, setTitle] = useState('');
    const [approvers, setApprovers] = useState([]);
    const [message, setMessage] = useState('');

       
    useEffect(() => {
        // Fetch job data for the specified requisition ID
        JobServiceData.getJobDataById(requisition_id,
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
            // Any clean-up code here
        };
    }, [formData, requisition_id]);

    const handleConfirmSubmit = () => {
        const paramData = {
            approvalTitle: title,
            emailAddresses: approvers,
            approvalMessage: message,
            jobReqId: requisition_id // Use requisition_id from URL
        };

        // ApprovalService.insertApprovalData(
        //     paramData,
        //     (data) => {
        //         if (data && data.data && data.data.approvalId) {
        //             setApprovalId(data.data.approvalId); // Update approvalId state
        //             setShowSubmissionModal(true);
        //         }
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );
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

     // Define the correct column values based on the reference header
     const columns = [
        { label: 'Job Requisition ID', value: formData.jobReqId },
        { label: 'Candidate Requisition Type', value: formData.candidateRequisitionType },
        { label: 'Candidate Recruitment Type', value: formData.candidateRecruitmentType },
        { label: 'Is Candidate Replacement', value: formData.isCandidateReplacement },
        { label: 'Replacement Name', value: formData.candidateReplacementName },
        { label: 'Requisition Status', value: formData.candidateRequisitionStatus },
        { label: 'Number of Opening', value: formData.numberOfOpening },
        { label: 'Hiring Location', value: formData.hiringLocation },
        { label: 'Is Confidential Hire', value: formData.isConfidentialHire },
        { label: 'Confidential Reason', value: formData.confidentialReason },
        { label: 'Candidate Team', value: formData.candidateTeam },
        { label: 'Candidate Group', value: formData.candidateGroup },
        { label: 'Candidate Hiring Manager', value: formData.candidateHiringManager },
        { label: 'Candidate Job Title', value: formData.candidateJobTitle },
        { label: 'Candidate Shift Timing', value: formData.candidateShiftTiming },
        { label: 'Candidate JD', value: formData.candidateJD },
        { label: 'Candidate Remarks', value: formData.candidateRemarks },
        { label: 'Description Footer', value: formData.descriptionFooter },
        { label: 'Emp Id', value: formData.empId },
        { label: 'Knox Id', value: formData.knoxId },
    ];

    return (
        <div className="main-container" style={{ padding: '15px', fontSize: '14px' }}>
            <h3 style={{ marginBottom: '20px', color: '#343a40', fontSize: '16px' }}>Job Requisition Detail</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="requisition_id" style={{ marginBottom: '10px' }}>
                    <Form.Label style={{ fontSize: '15px' }}>Job Requisition ID</Form.Label>
                    <Form.Control type="text" value={formData.jobReqId} readOnly style={{ fontSize: '14px', width: '250px' }} />
                </Form.Group>

                <Form.Group controlId="requisition_status" style={{ marginBottom: '20px' }}>
                    <Form.Label style={{ fontSize: '15px' }}>Requisition Status</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.candidateRequisitionStatus}
                        readOnly
                        style={{ fontSize: '14px', width: '250px' }}
                    />
                </Form.Group>

                {approvalId ? (
                    <p style={{ color: 'green', fontSize: '14px' }}>
                        Approval has been sent already! Here is the Approval Submitted ID: {approvalId}
                    </p>
                ) : (
                    <Button type="submit" variant="primary" style={{ marginBottom: '20px' }}>
                        Move to Approval
                    </Button>
                )}

                {columns.map((field, index) => (
                    <Form.Group controlId={field.label.toLowerCase().replace(/\s/g, '_')} style={{ marginBottom: '10px' }} key={index}>
                        <Form.Label style={{ fontSize: '15px' }}>{field.label}</Form.Label>
                        <Form.Control
                            type="text"
                            value={field.value}
                            disabled
                            style={{ fontSize: '14px', width: '50%' }}
                        />
                    </Form.Group>
                ))}
            </Form>

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Moving to the Approval Section.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdate}>
                        Move to Approval
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default JobReqDetail;
