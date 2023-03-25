import React, { useState } from 'react';
import {Button,Form}from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers';

export default function Formulaire({sunRaiseContract,handleCloseForm}:any) {

    const [name, setName] = useState("");
    const [goal, setGoal] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [show, setShow] = useState(false);
    const handleShow = () =>  setShow(true);
    const handleClose = () => setShow(false);

    const [validated, setValidated] = useState(false);

    const launchCampaign= async () => {
      try {
       
        const { ethereum }:any = window;
        handleCloseForm()
        if (ethereum) {

          //const campaign = await sunRaiseContract.launch(name,goal,description);
         // ethereum.autoRefreshOnNetworkChange = false;
          const campaign = await sunRaiseContract.launch(name, ethers.utils.parseEther(String(goal)),description,
            {
              gasLimit: 1000000,
            }
          );

          toast.info("Launch loading ...", {
            position: "top-left",
          
          });
         await campaign.wait();
  
          setName("");
          setGoal(0);
          setDescription("");
         
          toast.success("Success", {
            position: "top-left",
           
          });
        } else {
          console.log("Ethereum object doesn't exist!");
        
          alert(await sunRaiseContract.getTotalToken())
        }
      } catch (error:any) {alert("error")
     
        toast.error(`${error.message}`, {
          
        });
      }
    };

   
    const handleSubmit = (event:any) => {
      const form = event.currentTarget;
      let isValid = form.checkValidity();
      if ( isValid === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      setValidated(true);
      if (isValid) {
        launchCampaign()
      }
  
      }


    

  

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
                min={1}
                onChange={(e) => setGoal(parseInt(e.target.value))} 
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
