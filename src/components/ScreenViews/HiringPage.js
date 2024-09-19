import React, { useState } from 'react';
import './UserForm.css'; // Import the CSS file

const UserForm = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('mobile', mobile);
        formData.append('email', email);
        formData.append('jobDescription', jobDescription);
        if (file) {
            formData.append('file', file);
        }

        // Replace with your API endpoint
        fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Reset form
            setName('');
            setMobile('');
            setEmail('');
            setJobDescription('');
            setFile(null);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2>User Information</h2>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Mobile Number:</label>
                <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Job Description:</label>
                <select
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a job description</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="UX/UI Designer">UX/UI Designer</option>
                </select>
            </div>
            <div className="form-group">
                <label>Upload File:</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default UserForm;
