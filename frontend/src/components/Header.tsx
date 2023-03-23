import { useState } from 'react';
import {Container,Nav,Button,Modal,Navbar} from 'react-bootstrap';
import Formulaire from './Formulaire';

function Header({show,handleShow}:any) {


    const [showForm, setShowForm] = useState(false);
    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);


  return (
    <>
    <Navbar bg="link" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className='text-secondary fs-1 fw-bold'>SunRaise</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto ">
        {!show && <Button variant="warning fw-bold" onClick={handleShow}>CONNECT YOUR WALLET</Button>}&nbsp;
        {show && <Button variant="outline-secondary fw-bold" onClick={handleShowForm}>CREATE A CAMPAIGN</Button>}
        
            <Nav.Link href="#" className='text-dark fs-5'>305 ETH | 100 SOLAR</Nav.Link>
            <Nav.Link href="#" className='text-dark fs-5'></Nav.Link>
           

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
       {showForm && <Modal show={showForm} onHide={handleCloseForm}>
       <Modal.Header closeButton>
         <Modal.Title className='text-secondary fw-bold'>Create a campaign</Modal.Title>
       </Modal.Header>
       <Modal.Body>
       <Formulaire/>
       </Modal.Body>
   
       </Modal>}
    
   
   
</>
  );
}

export default Header;