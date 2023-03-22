import React, { useState } from 'react';
import {Button,Form}from 'react-bootstrap';


export default function Formulaire() {

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [description, setDescription] = useState("");

    const [show, setShow] = useState(false);
    const handleShow = () =>  setShow(true);
    const handleClose = () => setShow(false);

    const [validated, setValidated] = useState(false);

 
   
    const handleSubmit = (event:any) => {
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      
      setValidated(true);
      
      
  
    };


  

  return (
    <>
 
           <Form noValidate validated={validated} onSubmit={handleSubmit}>
           <Form.Group className="mb-2" controlId="validationCustom01">
             <Form.Label>Project name</Form.Label>
             <Form.Control
               type="text"
               required
               minLength={3}
               placeholder=""
               autoFocus
               onChange={(e) => setName(e.target.value)} 
               value={name}
             />
            <Form.Control.Feedback type="invalid"> Invalid name</Form.Control.Feedback>
           </Form.Group>          
          

           <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
             <Form.Label>Goal</Form.Label>
             <Form.Control
               type="number"
                required
                min={0}
                onChange={(e) => setGoal(e.target.value)} 
               value={goal}
              
             />
            <Form.Control.Feedback type="invalid"> Invalid Goal</Form.Control.Feedback>
           </Form.Group>

           <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description of the project</Form.Label>
              <Form.Control as="textarea" rows={3}
              required
               onChange={(e) => setDescription(e.target.value)} 
               value={description}
              />
              <Form.Control.Feedback type="invalid"> Invalid Description </Form.Control.Feedback>
            </Form.Group>

          

           <div className="d-flex justify-content-center">           
             <Button type="submit" variant="outline-warning" className="fs-5" >
                Launch
              </Button>
           </div>
         </Form>
         

      
    </>
  );
}
