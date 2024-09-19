import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Accordion from 'react-bootstrap/Accordion';

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

import ApprovalService from '../../API/ApprovalRestService'; // Import the Approval API service





function Prescreening() {

    const { candidateId } = useParams();

    const [approvalId, setApprovalId] = useState('');

    const [candidateCalled, setCandidateCalled] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [interviewScheduled, setInterviewScheduled] = useState(false);

    const [emailSent, setEmailSent] = useState(false);

    const [selectedDate, setSelectedDate] = useState('');

    const [activeKey, setActiveKey] = useState('0');

    const [showDateModal, setShowDateModal] = useState(false); // Modal for date confirmation
    const [showEmailModal, setShowEmailModal] = useState(false); // Modal for email confirmation

    

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                ApprovalService.fetchByApprovals(
                    candidateId,
                    (approvalId) => {
                        setApprovalId(approvalId);
                        console.log(`Approval ID set: ${approvalId}`);
                    },
                    (error) => {
                        console.error('Error fetching approvalId:', error);
                    }
                );
            } catch (error) {
                console.error('Error fetching approvalId:', error);
            }
        };

        fetchData(); // Fetch approvalId when component mounts
    }, [candidateId]);

    // Check if candidateId is provided in the URL
    if (!candidateId) {
        return (
            <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '20px' }}>
                Interview Scheduler
                </h3>
                <p style={{ fontSize: '14px', color: 'red' }}>
                Job Requisition ID is required for Interview Scheduler.
                </p>
            </div>
        );
    }

    const handleCallConfirmation = () => {
        setShowModal(false);
        setCandidateCalled(true);
        setActiveKey('1');
        handleButtonClick('Initial Assessment Done');
        
    };

      // Function to open the confirmation modal
      const handleCallCandidate = () => {
        setShowModal(true);
    };

     // Function to handle scheduling the interview
     const handleDateSelection = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
        setShowDateModal(true);
    };

    


    

    const handleDateConfirmation = () => {
        setShowDateModal(false);
        setInterviewScheduled(true);
        handleButtonClick('Interview scheduled');
    };


    // Function to handle sending email notifications
    const handleSendEmailRequest = () => {
        setShowEmailModal(true);
    };

    const handleEmailConfirmation = () => {
        setShowEmailModal(false);
        setEmailSent(true);
        handleButtonClick('Email Sent');
    };

    const handleButtonClick = async (interviewStatus) => {
        if (!approvalId) {
            console.error('Approval ID is not set');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4000/approval/${approvalId}/intStatus?interviewStatus=${interviewStatus}`);
            console.log(response.data);
            if (interviewStatus === 'Interview scheduled') {
                setInterviewScheduled(true);
            } else if (interviewStatus === 'Email Sent') {
                setEmailSent(true);
            } else if (interviewStatus === 'Initial Assessment Done') {
                setCandidateCalled(true);
                setActiveKey('1');
            }
        } catch (error) {
            console.error(`Error ${interviewStatus === 'Interview scheduled' ? 'scheduling interview' : interviewStatus === 'Email Sent' ? 'sending email' : 'calling candidate'}:`, error);
        }
    };



    return (

        <div style={{ padding: '20px' }}>

            <h3>Interview Scheduler</h3>

            <p>Job Requisition ID: {candidateId}</p>

            <Accordion activeKey={activeKey}>

                <Accordion.Item eventKey="0">

                    <Accordion.Header>Initial Assessment</Accordion.Header>

                    <Accordion.Body>

                        <p>Call the candidate to conduct a preliminary initial assessment.</p>

                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            {candidateCalled ? (

                                <>

                                    <p style={{ marginLeft: '10px', color: 'green' }}>Initial Assessment has been done.</p>

                                    <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={() => setActiveKey('1')}>

                                        Go to Interview Scheduling

                                    </Button>

                                </>

                            ) : (

                                <Button variant="primary" onClick={handleCallCandidate}>Schedule a Call </Button>

                            )}

                        </div>

                    </Accordion.Body>

                </Accordion.Item>

                <Accordion.Item eventKey="1" disabled={!candidateCalled}>

                    <Accordion.Header>Interview Scheduling</Accordion.Header>

                    <Accordion.Body>

                        <p>Schedule an interview with the candidate.</p>

                        <Form.Group controlId="interview-date">

                            <Form.Label>Select a date for the interview:</Form.Label>

                            <Form.Control type="date" onChange={handleDateSelection} />

                        </Form.Group>

                        <Button variant="primary" style={{ marginTop: '10px' }} onClick={handleDateConfirmation}>

                            Mark Date on Calendar

                        </Button>

                        {interviewScheduled && (

                            <p style={{ color: 'green', marginTop: '10px' }}>

                                Interview has been  alligned for the selected date: {new Date(selectedDate).toLocaleDateString('en-GB')}

                            </p>

                        )}

                        <h4 style={{ marginTop: '20px' }}>Email Notifications</h4>

                        <p>Send email notifications to relevant parties:</p>

                        <Button variant="primary" style={{ marginBottom: '10px' }} onClick={handleSendEmailRequest}>

                            Send Email to Candidate

                        </Button>

                        {emailSent && (

                            <p style={{ color: 'green', marginTop: '10px' }}>Email notifications have been sent.</p>

                        )}

                        <div style={{ marginTop: '10px' }}>

                            <Button variant="secondary" onClick={() => setActiveKey('0')}>Back to Phone Screening</Button>

                        </div>

                    </Accordion.Body>

                </Accordion.Item>

            </Accordion>

            <Modal show={showModal} onHide={() => setShowModal(false)}>

                <Modal.Header closeButton>

                    <Modal.Title>Confirm</Modal.Title>

                </Modal.Header>

                <Modal.Body>Do you want to call the candidate?</Modal.Body>

                <Modal.Footer>

                    <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>

                    <Button variant="primary" onClick={handleCallConfirmation}>Yes</Button>

                </Modal.Footer>

            </Modal>


                 {/* Modal for Date Confirmation */}
            <Modal show={showDateModal} onHide={() => setShowDateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to schedule the interview on {new Date(selectedDate).toLocaleDateString('en-GB')}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDateModal(false)}>No</Button>
                    <Button variant="primary" onClick={handleDateConfirmation}>Yes</Button>
                </Modal.Footer>
            </Modal>
            {/* Modal for Email Confirmation */}
            <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to send the email to the candidate?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEmailModal(false)}>No</Button>
                    <Button variant="primary" onClick={handleEmailConfirmation}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </div>

    );

}



export default Prescreening;



