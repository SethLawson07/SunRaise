import { useState } from 'react';
import {Button,ProgressBar,Card,Container,Row,Col} from 'react-bootstrap';
import img1 from '../assets/images/img1.jpg'

function Campaign() {
    const now = 70;
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  return (
    <Container>
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={12}>
        <Card >
          <Card.Img variant="top" src={img1} />
          <Card.Body>
            <Card.Title className="fw-bold">Build Africa solar park</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <br />
            <ProgressBar now={now} label={`${now}%`} variant="secondary" animated /><br />
            {!show && <Button variant="outline-warning">Support this project</Button>}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
}

export default Campaign;




