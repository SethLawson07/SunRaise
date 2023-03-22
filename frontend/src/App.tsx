import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Container,Row,Col} from 'react-bootstrap';
import Header from './components/Header'
import Campaign from './components/Card'


function App() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Header /><br />
      <Container>
      
      <Row>
        <Col>  <Campaign/></Col>
        <Col>  <Campaign/></Col>
        <Col>  <Campaign/></Col>
      </Row>
    </Container>

  
    
     

    </>
  )
}

export default App
