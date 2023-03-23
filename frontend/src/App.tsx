import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Container,Row,Col} from 'react-bootstrap';
import Header from './components/Header'
import Campaign from './components/Card'


function App() {
  const [count, setCount] = useState(0)

  
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Header show={show} handleShow={handleShow} /><br />
      <Container>
      
      <Row>
        <Col>  <Campaign show={show} handleShow={handleShow}/></Col>
        <Col>  <Campaign show={show} handleShow={handleShow}/></Col>
        <Col>  <Campaign show={show} handleShow={handleShow}/></Col>
      </Row>
    </Container>

  
    
     

    </>
  )
}

export default App
