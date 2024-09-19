import React from 'react';
import Card from 'react-bootstrap/Card';

function Policies() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>Company Policies</h3>

            {/* First Policy Card */}
            <Card style={{ marginBottom: '20px' }}>
                <Card.Header>Working Hours</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            Our working hours are from 9:00 AM to 6:00 PM, Monday to Friday. Employees are expected to be punctual and adhere to these timings.
                        </p>
                        <footer className="blockquote-footer">
                            Company Handbook <cite title="Source Title">2024 Edition</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>

            {/* Second Policy Card */}
            <Card style={{ marginBottom: '20px' }}>
                <Card.Header>Leave Policy</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            Employees are entitled to 15 days of paid leave per year. Additional leave can be requested, but must be approved by the HR department.
                        </p>
                        <footer className="blockquote-footer">
                            HR Department <cite title="Source Title">Policy Manual</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>

            {/* Third Policy Card */}
            <Card style={{ marginBottom: '20px' }}>
                <Card.Header>Dress Code</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            Business casual attire is required in the office. Jeans, t-shirts, and sneakers are permitted on Fridays.
                        </p>
                        <footer className="blockquote-footer">
                            Company Guidelines <cite title="Source Title">Dress Code Policy</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>

            {/* Add more policies as needed */}
        </div>
    );
}

export default Policies;
