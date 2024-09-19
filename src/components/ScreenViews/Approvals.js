import React, { useState, useEffect } from 'react';

import { Container, Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';

import { useParams, useNavigate } from 'react-router-dom';

import JobServiceData from '../../API/DashboardRestService';

import ApprovalService from '../../API/ApprovalRestService';



function Approvals() {

    const [title, setTitle] = useState('');

    const [searchEmail, setSearchEmail] = useState('');

    const [approvers, setApprovers] = useState([]);

    const [message, setMessage] = useState('');

    const [error, setError] = useState({});

    const [showSubmissionModal, setShowSubmissionModal] = useState(false);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [approvalId, setApprovalId] = useState('');

    const { requisition_id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);

    const JobReqId = formData?.jobReqId;



    useEffect(() => {

        JobServiceData.getJobDataById(

            requisition_id,

            (data) => {

                setFormData(data);

            },

            (error) => {

                console.log(error);

            }

        );

    }, [requisition_id]);



    // Ensure requisition_id is provided in the URL

    if (!requisition_id) {

        // Display message when requisition_id is missing

        return (

            <Container style={{ padding: '20px' }}>

                <h3 style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '20px' }}>

                    Approval Section

                </h3>

                <p style={{ fontSize: '14px', color: 'red' }}>

                    Job Requisition ID is required for approval submission.

                </p>

            </Container>

        );

    }



    const handleAddApprover = (event) => {

        event.preventDefault();

        if (!searchEmail) {

            setError({ ...error, searchEmail: 'Email address cannot be empty' });

            return;

        }

        if (approvers.includes(searchEmail)) {

            setError({ ...error, searchEmail: 'This email address has already been added' });

            return;

        }

        setError({ ...error, searchEmail: '' });

        setApprovers([...approvers, searchEmail]);

        setSearchEmail('');

    };



    const handleRemoveApprover = (email) => {

        setApprovers(approvers.filter((approver) => approver !== email));

    };



    const handleShowConfirmationModal = () => {

        setShowConfirmationModal(true);

    };



    const handleCancelSubmit = () => {

        setShowConfirmationModal(false);

    };


    const handleConfirmSubmit = () => {
        console.log('Confirm button clicked'); // Log when the button is clicked
    
        const paramData = {
            approvalTitle: title,
            emailAddresses: approvers,
            approvalMessage: message,
            jobReqId: JobReqId
        };
    
        console.log('Submitting data:', paramData); // Log the data being submitted
    
        ApprovalService.insertApprovalData(
            paramData,
            (data) => {
                console.log('Submission successful:', data); // Log success response
                setApprovalId(data.data.approvalId);
                setShowConfirmationModal(false);
                setShowSubmissionModal(true);
            },
            (error) => {
                console.log('Submission failed:', error); // Log error response
            }
        );
    };



    const handleSubmit = async (event) => {

        event.preventDefault();

        let validationErrors = {};

        if (!title) {

            validationErrors.title = 'Title is required';

        }

        if (approvers.length === 0) {

            validationErrors.searchEmail = 'At least one approver must be added';

        }

        if (Object.keys(validationErrors).length > 0) {

            setError(validationErrors);

            return;

        }

        setShowConfirmationModal(true);

    };



    const handleClose = () => {

        setShowSubmissionModal(false);

        navigate('/dashboard');

    };



    return (

        <Container className="approval-section" style={{ padding: '20px' }}>

            <h3 style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '20px' }}>Approval Section</h3>

            <p style={{ fontSize: '14px' }} name="JobReqId" value={formData?.jobReqId}>Job Requisition ID: {formData?.jobReqId}</p>

            <Form onSubmit={handleSubmit} id="approval-form">

                <Form.Group controlId="title" style={{ marginBottom: '15px' }}>

                    <Form.Label>

                        Title <span style={{ color: 'red' }}>*</span>

                    </Form.Label>

                    <Form.Control

                        type="text"

                        placeholder="Enter title"

                        value={title}

                        onChange={(e) => setTitle(e.target.value)}

                        style={{ width: '100%', fontSize: '14px' }}

                    />

                    {error.title && <p style={{ color: 'red', fontSize: '14px' }}>{error.title}</p>}

                </Form.Group>

                <Form.Group controlId="searchEmail" style={{ marginBottom: '15px' }}>

                    <Form.Label>

                        Search Email Address <span style={{ color: 'red' }}>*</span>

                    </Form.Label>

                    <InputGroup>

                        <FormControl

                            type="email"

                            placeholder="Search email address"

                            value={searchEmail}

                            onChange={(e) => setSearchEmail(e.target.value)}

                            style={{ width: '240px', fontSize: '14px' }}

                        />

                    </InputGroup>

                    {error.searchEmail && <p style={{ color: 'red', fontSize: '14px' }}>{error.searchEmail}</p>}

                    <Button

                        variant="primary"

                        onClick={handleAddApprover}

                        style={{ marginTop: '10px', padding: '5px 10px', fontSize: '14px' }}

                    >

                        Add Approver

                    </Button>

                </Form.Group>

                <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap' }}>

                    {approvers.map((email, index) => (

                        <div

                            key={index}

                            style={{

                                backgroundColor: '#f8f9fa',

                                padding: '10px',

                                borderRadius: '5px',

                                marginRight: '10px',

                                display: 'flex',

                                alignItems: 'center',

                            }}

                        >

                            <span style={{ marginRight: '10px', fontSize: '14px' }}>{email}</span>

                            <Button

                                variant="danger"

                                size="sm"

                                style={{ padding: '5px 10px', fontSize: '14px' }}

                                onClick={() => handleRemoveApprover(email)}

                            >

                                Remove

                            </Button>

                        </div>

                    ))}

                </div>

                <Form.Group controlId="message" style={{ marginBottom: '15px' }}>

                    <Form.Label>Message</Form.Label>

                    <Form.Control

                        as="textarea"

                        rows={5}

                        placeholder="Enter message"

                        value={message}

                        onChange={(e) => setMessage(e.target.value)}

                        style={{ width: '100%', fontSize: '14px' }}

                    />

                </Form.Group>

                <Button type="submit" variant="primary" style={{ padding: '5px 15px', fontSize: '14px' }}>

                    Submit

                </Button>

            </Form>

            <Modal show={showSubmissionModal} onHide={handleClose}>

                <Modal.Header closeButton>

                    <Modal.Title>Approval Submission</Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    Approval submitted successfully for Job Requisition ID: {requisition_id}.<br />

                    Approval Submitted ID: {approvalId}

                </Modal.Body>

                <Modal.Footer>

                    <Button variant="primary" onClick={handleClose}>

                        OK

                    </Button>

                </Modal.Footer>

            </Modal>

            <Modal show={showConfirmationModal} onHide={handleCancelSubmit}>

                <Modal.Header closeButton>

                    <Modal.Title>Confirm Submission</Modal.Title>

                </Modal.Header>

                <Modal.Body>Are you sure you want to submit the approval?</Modal.Body>

                <Modal.Footer>

                    <Button variant="secondary" onClick={handleCancelSubmit}>

                        Cancel

                    </Button>

                    <Button variant="primary" onClick={handleConfirmSubmit}>

                        Confirm

                    </Button>

                </Modal.Footer>

            </Modal>

        </Container>

    );

}



export default Approvals;

