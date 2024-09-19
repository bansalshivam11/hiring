import React, { useState,useEffect } from 'react';
import { Container, Form, Button, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import JobService from '../../API/JobRestService'


function JobReq() {
      // Define initial form data
      const [formData, setFormData] = useState({
        requisition_id: '',
        requisition_type: '',
        recruitment_type: '',
        isCandidateReplacement: '',
        replacement_name: '',
        emp_id: '',
        knox_id: '',
        requisition_status: 'In Approval',
        openings: '',
        ageing: '',
        //ageingCount: '',
        hiring_location: '',
        isConfidentialHire: '',
        confidential_reason: '',
        team: '',
        group: '',
        hiring_manager: '',
        job_title: '',
        candidateShiftTiming: '',
        job_description: '',
        description_footer: '',
        remarks: '',
        //attachment: '',
    });

    // // Initialize form data state from local storage
    // const [formData, setFormData] = useState(() => {
        
    //     const savedData = localStorage.getItem('jobReqFormData');
    //     return savedData ? JSON.parse(savedData) : initialFormData;
    // });



     // State for modal visibility
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        replacement_name: '',
        emp_id: '',
        knox_id: '',
    });


  // State for tracking form validity and alerts
const [formValid, setFormValid] = useState(true);
const [alertMessage, setAlertMessage] = useState('');
const [openingsAlert, setOpeningsAlert] = useState('');
const [jobReqId,setJobReqId]=useState("");
// Function to validate the form upon submission
const validateForm = () => {
    let valid = true;
    let alertMessage = '';

    // Check Number of Openings
    const openings = parseInt(formData.openings, 10);
    if (isNaN(openings) || openings < 1) {
        valid = false;
        alertMessage = 'Number of Openings must be at least 1.';
        setFormValid(valid);
        setAlertMessage(alertMessage);
        return valid;
    }

     // Check Job Requisition date
    //  if (!formData.ageing) {
    //     valid = false;
    //     alertMessage = 'Job Requisition date is required.';
    //     setFormValid(valid);
    //     setAlertMessage(alertMessage);
    //     return valid;
    // }

    // Check Job Description
    if (!formData.job_description) {
        valid = false;
        alertMessage = 'Job Description is required.';
        setFormValid(valid);
        setAlertMessage(alertMessage);
        return valid;
    }

    // Check Remarks
    if (!formData.remarks) {
        valid = false;
        alertMessage = 'Remarks are required.';
        setFormValid(valid);
        setAlertMessage(alertMessage);
        return valid;
    }

    // Check Attachment
    // if (!formData.attachment) {
    //     valid = false;
    //     alertMessage = 'Attachment is required.';
    //     setFormValid(valid);
    //     setAlertMessage(alertMessage);
    //     return valid;
    // }

    // If all fields pass validation
    setFormValid(valid);
    setAlertMessage('');
    return valid;
};



const handleChange = (event) => {
    const { name, value } = event.target;

    // Handle Number of Openings input
    if (name === 'openings') {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue) || parsedValue < 1) {
            setOpeningsAlert('Number of Openings must be at least 1.');
            setFormData((formData) => ({
                ...formData,
                [name]: '',
            }));
        } else {
            setOpeningsAlert('');
            setFormData((formData) => ({
                ...formData,
                [name]: parsedValue.toString(),
            }));
        }
    } else {
        // Update form data with the new value for other fields
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));    
};

      // Clear the alert for job_description, remarks, or attachment when the input is non-empty
      if ((name === 'job_description' || name === 'remarks' || name === 'attachment' ||name === 'openings' ||name==='ageing') && value.trim() !== '') {
        setFormValid(true);
        setAlertMessage(''); // Clear alert message
    }

    // Show the modal when "Yes" is selected for the "isCandidateReplacement" question
      if (name === 'isCandidateReplacement' && value === 'Yes') {
            setShowModal(true);
        }

    else {
        // For other fields, simply update the form data with the new value
        setFormData((formData) => ({...formData,[name]: value}));
    }

    };

    const handleModalChange = (event) => {
        const { name, value } = event.target;
        setModalData((formData) => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmitModal = () => {
        // Update the main form data with the modal data
        setFormData((formData) => ({
            ...formData,
            replacement_name: modalData.replacement_name,
            emp_id: modalData.emp_id,
            knox_id: modalData.knox_id,
        }));
        // Close the modal
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

      // State for showing and handling the confidential modal
      const [showConfidentialModal, setShowConfidentialModal] = useState(false);
      const [confidentialReason, setConfidentialReason] = useState('');
  
      // Function to show the confidential modal
      const handleShowConfidentialModal = () => {
          setShowConfidentialModal(true);
      };
  
      // Function to close the confidential modal
      const handleCloseConfidentialModal = () => {
          setShowConfidentialModal(false);
      };
  
      // Function to handle changes in the confidential reason input
      const handleConfidentialReasonChange = (event) => {
          setConfidentialReason(event.target.value);
      };
  
      // Function to handle submission of confidential reason and update form data
      const handleConfidentialSubmit = () => {
          // Update the main form data with the confidential reason from the modal
          setFormData((formData) => ({
              ...formData,
              confidential_reason: confidentialReason,
          }));
          // Close the confidential modal
          setShowConfidentialModal(false);
      };

const navigate = useNavigate();
const [showConfirmationModal, setShowConfirmationModal] = useState(false);
const [showSuccessModal, setShowSuccessModal] = useState(false);
//const [submittedRequisitionId, setSubmittedRequisitionId] = useState('');


// Handle confirm submit
// MAIN funtion to call POST API

const handleConfirmSubmit = () => {
    
    console.log('Form submitted:', formData)

    const paramData = {
            "candidateRequisitionType":formData.requisition_type,
            "candidateRecruitmentType": formData.recruitment_type,
            "isCandidateReplacement": formData.isCandidateReplacement,
            "candidateReplacementName":formData.replacement_name,
            "candidateRequisitionStatus":formData.requisition_status,
            "numberOfOpening": formData.openings,
            "hiringLocation": formData.hiring_location,
            "isConfidentialHire": formData.isConfidentialHire,
            "confidentialReason": formData.confidential_reason,
            "candidateTeam": formData.team,
            "candidateGroup": formData.group,
            "candidateHiringManager": formData.hiring_manager,
            "candidateJobTitle":formData.job_title,
            "candidateShiftTiming": formData.candidateShiftTiming,
            "candidateJD":formData.job_description,
            "candidateRemarks": formData.remarks,
            "descriptionFooter": formData.description_footer,
            "empId": formData.emp_id,
            "knoxId": formData.knox_id
        
      }

      JobService.insertJobData(paramData,(res)=>{
        console.log(res);
        setJobReqId(res.data.jobReqId)
      },(error)=>{
        console.log(error);

      },
    
    setShowConfirmationModal(false),
    setShowSuccessModal(true),
      )
};



// Handle form submit
const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form (assume validateForm function is defined)
    if (validateForm()) {
        // Show the confirmation modal
        setShowConfirmationModal(true);
    } else {
        console.log('Form validation failed.');
    }
};

// Close success modal and navigate to approvals with the submitted requisition ID
const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // Navigate to the approvals route with the submitted requisition ID appended to the URL
    const requisition_id=jobReqId;
    navigate('/dashboard');
};


    return (
        
        <>

        <div className="main-container">

            
            
            <Container>
                 {/* Display alert for Number of Openings if invalid */}
                 {openingsAlert && (
                    <Alert
                        variant="danger"
                        dismissible
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            zIndex: 1000,
                        }}
                    >
                        {openingsAlert}
                    </Alert>
                )}

                {/* Display alert if form is invalid upon submission */}
                {!formValid && (
                    <Alert
                        variant="danger"
                        onClose={() => setFormValid(true)}
                        dismissible
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            zIndex: 1000,
                        }}
                    >
                        {alertMessage}
                    </Alert>
                )}


                <Form onSubmit={handleSubmit} className="text-left"> {/* Align form to the left */}
                
                    <h3 className="mb-4">Job Requisition Template</h3>                  
                    
                    {/* Job Requisition ID */}
                    <Form.Group controlId="requisition_id">
                        <Form.Label>Job Requisition ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="requisition_id"
                            value={formData.requisition_id}
                            readOnly
                            disabled
                            size="sm"
                        />
                        <Form.Text>The system will generate this ID by default.</Form.Text>
                    </Form.Group>

                    {/* Requisition Type */}
                    <Form.Group controlId="requisition_type">
                        <Form.Label>Requisition Type</Form.Label>
                        <Form.Control as="select" name="requisition_type" value={formData.requisition_type} onChange={handleChange} size="sm">
                            <option value="">--- Select Requisition Type---</option>
                            <option value="new">New</option>
                            <option value="replacement">Replacement</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Recruitment Type */}
                    <Form.Group controlId="recruitment_type">
                        <Form.Label>Type of Recruitment</Form.Label>
                        <Form.Control as="select" name="recruitment_type" value={formData.recruitment_type} onChange={handleChange} size="sm">
                            <option value="">---Select PayRoll Type---</option>
                            <option value="On Roll">On Roll</option>
                            <option value="Off Roll">Off Roll</option>
                        </Form.Control>
                    </Form.Group>

         {/* Replacement Candidate Details */}
        <Form.Group controlId="isCandidateReplacement">
                        <Form.Label>Replacement Candidate Details</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                name="isCandidateReplacement"
                                label="Yes"
                                value="Yes"
                                checked={formData.isCandidateReplacement === 'Yes'}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="radio"
                                name="isCandidateReplacement"
                                label="No"
                                value="No"
                                checked={formData.isCandidateReplacement === 'No'}
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>

                    {/* Display replacement candidate details in the modal */}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Replacement Candidate Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="replacement_name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="replacement_name"
                                    placeholder="Name"
                                    value={modalData.replacement_name}
                                    onChange={handleModalChange}
                                    size="sm"
                                />
                            </Form.Group>
                            <Form.Group controlId="emp_id">
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="emp_id"
                                    placeholder="Employee Id"
                                    value={modalData.emp_id}
                                    onChange={handleModalChange}
                                    size="sm"
                                />
                            </Form.Group>
                            <Form.Group controlId="knox_id">
                                <Form.Label>Knox ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="knox_id"
                                    placeholder="Knox ID"
                                    value={modalData.knox_id}
                                    onChange={handleModalChange}
                                    size="sm"
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleSubmitModal}>
                                Submit
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Add disabled fields for replacement candidate details to the form */}
{formData.isCandidateReplacement === 'Yes' && (
    <>
        <Form.Group controlId="replacement_name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                name="replacement_name"
                value={formData.replacement_name}
                disabled
                size="sm"
            />
        </Form.Group>
        <Form.Group controlId="emp_id" className="mb-3">
            <Form.Label>Employee Id</Form.Label>
            <Form.Control
                type="text"
                name="emp_id"
                value={formData.emp_id}
                disabled
                size="sm"
            />
        </Form.Group>
        <Form.Group controlId="knox_id" className="mb-3">
            <Form.Label>Knox ID</Form.Label>
            <Form.Control
                type="text"
                name="knox_id"
                value={formData.knox_id}
                disabled
                size="sm"
            />
        </Form.Group> {/* Closing tag for Form.Group was missing */}
    </>
)}

                    {/* Requisition Status */}
                    <Form.Group controlId="requisition_status">
                        <Form.Label>Requisition Status</Form.Label>
                        <Form.Control as="select" name="requisition_status" value={formData.requisition_status} onChange={handleChange} size="sm">
                            <option value="In Approval">In Approval</option>
    
                        </Form.Control>
                    </Form.Group>

                  {/* Number of Openings */}
<Form.Group controlId="openings">
    <Form.Label>Number of Openings<span style={{ color: 'red' }}> *</span></Form.Label>
    <Form.Control
        type="number"
        name="openings"
        value={formData.openings}
        onChange={handleChange}
        min="1" // This ensures the number of openings starts from one
        size="sm"
    />
</Form.Group>


                   {/* Ageing */}
                   {/* <Form.Group controlId="ageing">
    <Form.Label>Job Requisition Date<span style={{ color: 'red' }}> *</span></Form.Label>
    <Form.Control
        type="date"
        name="ageing"
        value={formData.ageing}
        onChange={handleChange}
        size="sm"
        // Disable dates beyond the current date
        max={new Date().toISOString().split("T")[0]}
    />
    <Form.Text>The count begins today, from the day the candidate's job requisition is submitted.</Form.Text>
</Form.Group> */}


                    {/* Hiring Location */}
                    <Form.Group controlId="hiring_location">
                        <Form.Label>Hiring Location</Form.Label>
                        <Form.Control as="select" name="hiring_location" value={formData.hiring_location} onChange={handleChange} size="sm">
                            <option value="">---Select Location---</option>
                            <option value="Gurgaon">Gurgaon</option>
                            <option value="Noida">Noida</option>
                        </Form.Control>
                    </Form.Group>

                   {/* Confidential Hire */}
<Form.Group controlId="isConfidentialHire">
    <Form.Label>Confidential Hire</Form.Label>
    <div>
        <Form.Check
            type="radio"
            name="isConfidentialHire"
            label="Yes"
            value="Yes"
            id="Yes"
            checked={formData.isConfidentialHire === 'Yes'}
            onChange={handleChange}
            onClick={handleShowConfidentialModal}
        />
        <Form.Check
            type="radio"
            name="isConfidentialHire"
            label="No"
            value="No"
            id="No"
            checked={formData.isConfidentialHire === 'No'}
            onChange={handleChange}
        />
    </div>
</Form.Group>

{/* Modal for Confidential Hire Reason */}
<Modal show={showConfidentialModal} onHide={handleCloseConfidentialModal}>
    <Modal.Header closeButton>
        <Modal.Title>Confidential Hire Reason</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form.Group controlId="confidential_reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
                type="text"
                name="confidential_reason"
                placeholder="Reason"
                value={confidentialReason}
                onChange={handleConfidentialReasonChange}
                size="sm"
            />
        </Form.Group>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseConfidentialModal}>
            Close
        </Button>
        <Button variant="primary" onClick={handleConfidentialSubmit}>
            Submit
        </Button>
    </Modal.Footer>
</Modal>

{formData.isConfidentialHire === 'Yes' && (
    <>
        <Form.Group controlId="confidential_reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
                type="text"
                name="confidential_reason"
                value={formData.confidential_reason}
                disabled
                size="sm"
            />
        </Form.Group>
    </>
)}


                    {/* Team */}
                    <Form.Group controlId="team">
                        <Form.Label>Team</Form.Label>
                        <Form.Control as="select" name="team" value={formData.team} onChange={handleChange} size="sm">
                        <option value="">---Select  Team---</option>
                        <option value="Dev team">Dev Team</option>
                       <option value="Sales team">Sales Team</option>
                        <option value="Marketing team">Marketing Team</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Group */}
                    <Form.Group controlId="group">
                        <Form.Label>Group</Form.Label>
                        <Form.Control as="select" name="group" value={formData.group} onChange={handleChange} size="sm">
                        <option value="">---select  Group---</option>
                        <option value="Solution Group">Solution Group</option>
                            <option value="Development team">Development Team</option>
                            <option value="Marketing department">Marketing Department</option>
                            <option value="Sales division">Sales Division</option>
                            <option value="Customer Success Team">Customer Success Team</option>
                            <option value="Operations Unit">Operations Unit</option>
                        
                        </Form.Control>
                    </Form.Group>

                    {/* Hiring Manager */}
                    <Form.Group controlId="hiring_manager">
                        <Form.Label>Hiring Manager</Form.Label>
                        <Form.Control as="select" name="hiring_manager" value={formData.hiring_manager} onChange={handleChange} size="sm">
                        <option value="">---select  Manager---</option>
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Smith">Jane Smith</option>
                        <option value="Michael Jackson">Michael Jackson</option>
                        <option value="Sarah Parker">Sarah Parker</option>
                        <option value="David Miller">David Miller</option>
                        <option value="Emily Jones">Emily Jones</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Job Title */}
                    <Form.Group controlId="job_title">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control as="select" name="job_title" value={formData.job_title} onChange={handleChange} size="sm">
                        <option value="">---select  Title---</option>
                        <option value="Software Development">Software Development</option>
                            <option value="QA Testing">QA Testing</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Data Engineering">Data Engineering</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Shift Timings */}
                    <Form.Group controlId="candidateShiftTiming">
                        <Form.Label>Shift Timings / Working Hrs (IST)</Form.Label>
                        <Form.Control as="select" name="candidateShiftTiming" value={formData.candidateShiftTiming} onChange={handleChange} size="sm">
                        <option value="">---Select Shift Timings---</option>
                        <option value="Morning Shift">Morning Shift </option>
                        <option value="Evening Shift">Evening Shift </option>
                            <option value="Night Shift">Night Shift </option>
                        </Form.Control>
                    </Form.Group>

                    {/* Job Description */}
                    <Form.Group controlId="job_description">
                        <Form.Label>Job Description<span style={{ color: 'red' }}> *</span></Form.Label>
                        <Form.Control as="textarea" name="job_description" rows="4" value={formData.job_description} onChange={handleChange} size="sm" />
                    </Form.Group>

                    {/* Description Footer */}
                    {/* <Form.Group controlId="description_footer">
                        <Form.Label>Description Footer</Form.Label>
                        <Form.Control
                            type="text"
                            name="description_footer"
                            value={formData.description_footer}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Form.Group> */}

                    {/* Remarks */}
                    <Form.Group controlId="remarks">
                        <Form.Label>Remarks<span style={{ color: 'red' }}> *</span></Form.Label>
                        <Form.Control
                            as="textarea"
                            name="remarks"
                            rows="2"
                            value={formData.remarks}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Form.Group>

                    {/* Attachment
                    <Form.Group controlId="attachment">
                        <Form.Label>Attachment<span style={{ color: 'red' }}> </span></Form.Label>
                        <Form.Control type="file" name="attachment" onChange={handleChange} size="sm" />
                    </Form.Group> */}

                    <div className="button-group">
                        
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                        {/* <Button
                            type="button"
                            variant="danger"
                            onClick={handleClear}
                            style={{ marginLeft: '10px' }}
                        >
                            Clear
                        </Button> */}
                    </div>
                </Form>
            </Container>
        </div>
          
          <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
          <Modal.Header closeButton>
              <Modal.Title>Confirm Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              Are you sure you want to submit the job requisition form?
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
                  Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmSubmit}>
                  Confirm
              </Button>
          </Modal.Footer>
      </Modal>

      
      
      <Modal show={showSuccessModal} onHide={handleSuccessClose}>
    <Modal.Header closeButton>
        <Modal.Title>Form Submission Successful</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>The form was submitted successfully!</p>
        {/* <p>Requisition ID: <strong>{submittedRequisitionId}</strong></p> */}
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={handleSuccessClose}>
            OK
        </Button>
    </Modal.Footer>
</Modal>


  </>

    );
}

export default JobReq;