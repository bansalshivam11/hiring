import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import personIcon from '../views/img/person.png';

function GenNavBar() {
   

    return (
        <Navbar bg="light" className="header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', boxShadow: '0 6px 7px -4px rgba(0, 0, 0, 0.2)', height: '50px', width: '100%' }}>
            {/* Left section: Logo */}
            <div></div>
            {/* Right section: Person icon */}
            <div className="header-right">
                <img src={personIcon} alt="Person Icon" style={{ marginLeft: 'auto', width: '23px', height: 'auto', cursor: 'pointer' }} />
            </div>
        </div>
    </Navbar>
    );
}

export default GenNavBar;
