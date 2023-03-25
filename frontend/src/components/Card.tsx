import { useState } from 'react';
import {Button,ProgressBar,Card,Container,Row,Col} from 'react-bootstrap';
import img1 from '../assets/images/img1.jpg'

function Campaign({show,handleShow,name,total,goal,description}:any) {
    const now = 70;
    
  return (
    <Container>
    <Row className="justify-content-center">
      <Col xs={12} md={4} lg={12}>
        <Card >
          <Card.Img variant="top" src={img1} />
          <Card.Body>
            <Card.Title className="fw-bold">{name} </Card.Title>
            <Card.Text>
           
            {description}
            </Card.Text>
            <br />
            <ProgressBar now={now} label={`${total/goal*100}%`} variant="secondary" animated /><br />
            {show ? <Button variant="outline-warning">Support this project</Button> :
              <Button disabled variant="outline-warning">Support this project</Button>
            }
          </Card.Body>
        </Card>
      
      </Col>
    </Row>
  </Container>
  );
}

export default Campaign;




