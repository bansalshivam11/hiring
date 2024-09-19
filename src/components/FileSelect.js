import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FileUploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Handle file upload logic here, such as sending it to a server
      console.log('File to be uploaded:', selectedFile);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div style={{ padding: '20px', fontSize: '16px' }}>
      <Form.Group>
        <Form.Label>Upload a PDF or Word file</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
          accept=".pdf, .doc, .docx"
          style={{ marginBottom: '15px' }}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleFileUpload}>
        Upload File
      </Button>

      {selectedFile && (
        <div style={{ marginTop: '10px' }}>
          <strong>Selected File:</strong> {selectedFile.name}
        </div>
      )}
    </div>
  );
}

export default FileUploadComponent;
