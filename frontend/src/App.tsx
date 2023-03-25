import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Container,Row,Col,Button} from 'react-bootstrap';
import Header from './components/Header'
import Campaign from './components/Card'
import abi from "../utils/SunRaise.json"

import 'react-toastify/dist/ReactToastify.css';
import  dotenv from 'dotenv' ;
import { ethers } from 'ethers';
//dotenv.config()

function App() {
  const [count, setCount] = useState(0)

  
  // const contratAdresss = process.env.CONTRACT_ADDRESS;
  const contractAddress  = "0x482748342cec6c5B5ACdf23D9F45E4c5Fd31c9be";
  const contractABI = abi.abi;
  const [allCampaign, setAllCampaign] = useState([]);
  
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  

  const { ethereum } :any= window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const sunRaiseContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  const getAllCampaign = async () => {
    try {
      if (ethereum) {

        const campaigns = await sunRaiseContract.getCampaigns();


        const campaignCleaned = campaigns.map((campaign :any) => {
          return {
            name: campaign.name,
           // timestamp: new Date(campaign.timestamp * 1000),
            goal:campaign.goal,
            total:campaign.total,
            description: campaign.description,
            
          };
        });

        /*
         * Store our data in React State
         */
        setAllCampaign(campaignCleaned)
       
      } else {
        console.log("Ethereum object doesn't exist!");
    
      }
    } catch (error) {
      console.log(error);

    }
  }

    useEffect(() => {
      getAllCampaign();
    }, []);

  return (
    <>
      <Header 
          show={show} 
          handleShow={handleShow} 
          contractAddress={contractAddress} 
          contractABI={contractABI}
          provider={provider}
          sunRaiseContract={sunRaiseContract}
          
      /><br />

<Container>
 
        <Row >
        {allCampaign.map((campaign, index) => {
   
       return (
          <Col key={index}>
            <Campaign show={show} handleShow={handleShow} name={campaign.name} description={campaign.description}
            total={campaign.total}
            goal={campaign.goal}
            />
          </Col> );
   
        })}
        </Row>
     
</Container>


    </>
  )
}

export default App
