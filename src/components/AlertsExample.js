import React, { useState } from "react";
import { Alert, Container, Card, Button, Badge, ButtonGroup, Dropdown, ToggleButton,ToggleButtonGroup } from "react-bootstrap";

function AlertsExample() {
    const [show, setShow] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState("1");

    const handleChange = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    // Define the radio buttons with name and value pairs
    const radios = [
        { name: "Active", value: "1" },
        { name: "Success", value: "2" },
        { name: "Danger", value: "3" },
    ];

    const handleCheckbox=(e)=>{
        console.log(e);
    }

    const handleRadio=(e)=>{
        console.log(e);
    }

    const[selectIt,SetslectIt]=useState("");
    const handleDropdown=(eventKey)=>{
        console.log("selected=",eventKey);
        SetslectIt(eventKey);
    }
    return (
        <div>
            <>
                <Container>
                    <Card>
                        <Alert
                            variant="primary"
                            show={show}
                            dismissible
                            onClose={() => setShow(false)}
                        >
                            <Alert.Heading>This is primary Alert.</Alert.Heading>
                            <p>This is the body of our Alert.</p>
                            <div>This is a div.</div>
                        </Alert>
                    </Card>
                </Container>

                {!show && (
                    <Button onClick={() => setShow(true)}>
                        Open <Badge pill bg="warning">*</Badge>
                    </Button>
                )}

                <Container>
                    <Button
                        variant="primary"
                        disabled={isLoading}
                        onClick={handleChange}
                    >
                        {isLoading ? "Loading..." : "API Call"}
                    </Button>
                </Container>

                <Container>
                    <ButtonGroup>
                        <ToggleButton
                            id="toggle-checkbox"
                            type="checkbox"
                            variant="outline-primary"
                            checked={checked}
                            value="1"
                            onChange={(e) => setChecked(e.currentTarget.checked)}
                        >
                            Check
                        </ToggleButton>
                    </ButtonGroup>
                </Container>

                {/* Container with radio buttons */}
                <Container>
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={radio.value === radioValue ? (radio.value === '2' ? 'success' : radio.value === '3' ? 'danger' : 'primary') : 'outline-primary'} // Change variant based on selection
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Container>

                <Container>
                <ToggleButtonGroup type="checkbox" defaultValue={[1,3]} onChange={handleCheckbox}>

                <ToggleButton id="check-1" value={1}>Checkbox-1</ToggleButton>
                <ToggleButton id="check-2" value={2}>Checkbox-2</ToggleButton>
                <ToggleButton id="check-3" value={3}>Checkbox-3</ToggleButton>

                </ToggleButtonGroup>

                </Container>

                <Container>
                <ToggleButtonGroup type="radio" name="option" onChange={handleRadio} defaultValue={2}>

                <ToggleButton id="radio-1" value={1}>Radio-1</ToggleButton>
                <ToggleButton id="radio-2" value={2}>Radio-2</ToggleButton>
                <ToggleButton id="radio-3" value={3}>Radio-3</ToggleButton>

                </ToggleButtonGroup>

                </Container>

                <Container>
            <Card style={{ width: "20rem", margin: "50px" }} text="light" bg="dark">
                {/* <Card.Header as="h4">This is the card header.</Card.Header> */}
                
                {/* Card.Img and Card.ImgOverlay are direct children of Card */}
                <Card.Img src="https://picsum.photos/200" variant="top" />
                <Card.ImgOverlay>
                    <Card.Text>This is a text overlay.</Card.Text>
                </Card.ImgOverlay>
                
                <Card.Body>This is the card body.
                    <Card.Title>This is the title.</Card.Title>
                </Card.Body>
                
                <Card.Footer>This is the card footer.
                    <Card.Link href="https://google.com">Google</Card.Link>
                </Card.Footer>
            </Card>

            <Card style={{ width: "20rem", margin: "50px" }} body>
                This is the card body.
            </Card>
        </Container>

        <Container onSelect={handleDropdown}>
            <Dropdown>
            <Dropdown.Toggle>Click Me</Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item eventKey="Item-1">Item-1</Dropdown.Item>
            <Dropdown.Item eventKey="Item-2">Item-2</Dropdown.Item>
            <Dropdown.Item eventKey="Item-3">Item-3</Dropdown.Item>
            <Dropdown.Item eventKey="Item-4">Item-4</Dropdown.Item>
            <Dropdown.Item eventKey="Item-5">Item-5</Dropdown.Item>
            </Dropdown.Menu>

            </Dropdown>
        </Container>


            </>
        </div>
    );
}

export default AlertsExample;




// if (show) {
//     return (
//         <div>
//           <>
//             <Container>
//               <Card>
//                 <Alert variant="primary" dismissible onClose={()=>{setShow(false)}}>
//                   <Alert.Heading> This is primary Alert.</Alert.Heading>
//                   <p>This is the body of our Alert.</p>
//                   <div>This is a div.</div>
//                 </Alert>
//               </Card>
//             </Container>
//           </>
//         </div>
//       );
//             }
//     else{
//         return(
//             <div>
//                 <button onClick={()=>{setShow(true)}}>Open</button>
//             </div>
//         )
//     }
