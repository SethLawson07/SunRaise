import { useEffect, useState } from 'react';
import {Container,Nav,Button,Modal,Navbar} from 'react-bootstrap';
import Formulaire from './Formulaire';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers';

function Header({show,handleShow,contractAddress,contractABI,provider,sunRaiseContract}:any) {


    const [showForm, setShowForm] = useState(false);
    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    const [currentAccount, setCurrentAccount] = useState("");
    const [accountBalance, setAccountBalance] = useState();
    const { ethereum }:any = window;

    const checkIfWalletIsConnected = async () => {
      try {
       
        const accounts = await ethereum.request({ method: "eth_accounts" });
  
        if (accounts.length !== 0) {
          const account = accounts[0];
          setCurrentAccount(account);
          toast.success("🦄 Wallet is Connected", {
          
          });
        } else {
          toast.warn("Make sure you have MetaMask Connected", {
           
          });
        }
      } catch (error:any) {
        toast.error(`${error.message}`, {
         
        });
      }
    };
    
  
    /**
     * Implement your connectWallet method here
     */
   const connectWallet = async () => {
      try {

        if (!ethereum) {
          toast.warn("Make sure you have MetaMask Connected", {
            
          });
          return;
        }
  
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        handleShow()
        toast.success("Connected with success ✅", {
          position: "top-right",
       
        });
      } catch (error) {
        console.log(error);
      }
    };
    

    const getAccountBalance = async (provider:any) => {
      try {
        if (ethereum) {
         
         let balanceWei  = await provider.getBalance("ethers.eth");
         let balanceEther = ethers.utils.formatEther(balanceWei)
         setAccountBalance(parseInt(balanceEther))
        
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
        console.log(accountBalance);
        
      }
    };
    
    useEffect(() => {
     // checkIfWalletIsConnected();
      getAccountBalance(provider)
     // ethereum.autoRefreshOnNetworkChange = false;
    }, []);

  return (
    <>
    
    <Navbar bg="link" expand="lg">
      <ToastContainer/>
      <Container>
        <Navbar.Brand href="#home" className='text-secondary fs-1 fw-bold'>SunRaise</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto ">
        {!show && <Button variant="warning fw-bold" onClick={connectWallet}>CONNECT YOUR WALLET</Button>}&nbsp;
        {show && <Button variant="outline-secondary fw-bold" onClick={handleShowForm}>CREATE A CAMPAIGN</Button>}
        
            <Nav.Link href="#" className='text-dark fs-5'>{accountBalance} | 100 SOLAR</Nav.Link>
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
       <Formulaire 
          sunRaiseContract={sunRaiseContract} 
          handleCloseForm={handleCloseForm}
          />
       </Modal.Body>
   
       </Modal>}
    
   
   
</>
  );
}

export default Header;