import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SunRaise", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySrFixture() {
    

   

    // Contracts are deployed using the first signer/account by default
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Sr = await ethers.getContractFactory("SunRaise");
    const sr = await Sr.deploy();

    return { sr, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { sr, owner } = await loadFixture(deploySrFixture);

      expect(await sr.deployer()).to.equal(owner.address);

     
    });

    it("Should launch a campaign", async function () {
      const { sr, owner } = await loadFixture(deploySrFixture);
      const name : string = "Africa Solar park";
      const goal : any = ethers.utils.parseEther("1500.0");
      const description : string = "Build Africa solar park";
      

      await sr.launch(name,goal,description);


      expect(await sr.count()).to.equal(1);
    });

    it("Should contribute", async function () {
      const { sr, owner } = await loadFixture(deploySrFixture);
      const name : string = "Africa Solar park";
      const goal : any = ethers.utils.parseEther("1500.0");
      const amount : any = ethers.utils.parseEther("2");
      const description : string = "Build Africa solar park";
      

      await sr.launch(name,goal,description);        
      await sr.contribute(1,{value : amount});     
      expect(await sr.getContributorToken()).to.equal(200);
      expect(await sr.getContributorBalance(1)).to.equal(2);      
      expect(await sr.getBalance(1)).to.equal(2);
    });


    it("Should Refund", async function () {
      const { sr, owner } = await loadFixture(deploySrFixture);
      const name : string = "Africa Solar park";
      const goal : any = ethers.utils.parseEther("1500.0");
      const amount : any = ethers.utils.parseEther("2");
      const description : string = "Build Africa solar park";
      

      await sr.launch(name,goal,description);        
      await sr.contribute(1,{value : amount});
      await sr.refund(1);
      
      expect(await sr.getContributorBalance(1)).to.equal(0);      
      expect(await sr.getBalance(1)).to.equal(0);
    });

    it("Should show campaigns ", async function () {
      const { sr, owner } = await loadFixture(deploySrFixture);
      const name : string = "Africa Solar park";
      const goal : any = ethers.utils.parseEther("1500.0");
      const amount : any = ethers.utils.parseEther("2");
      const description : string = "Build Africa solar park";
      

      await sr.launch(name,goal,description);
      const campaigns = await sr.getCampaigns();
     
      //console.log(campaigns);
      
    });

    it("Should show a campaign", async function () {
      const { sr, owner } = await loadFixture(deploySrFixture);
      const name : string = "Africa Solar park";
      const goal : any = ethers.utils.parseEther("1500.0");
      const amount : any = ethers.utils.parseEther("2");
      const description : string = "Build Africa solar park";
      

      await sr.launch(name,goal,description);
      const campaigns = await sr.getCampaign(1);
     
      //console.log(campaigns);
 
    });

    it("Should finalize", async function () {
      const { sr, owner,addr1 } = await loadFixture(deploySrFixture);
      const balance = await sr.getAccountBalance();
      const name : string = "Africa Solar park";
      const goal : any = ethers.utils.parseEther("1500.0");
      const amount : any = ethers.utils.parseEther("2");
      const description : string = "Build Africa solar park";
      

      await sr.launch(name,goal,description);        
      await sr.connect(addr1).contribute(1,{value : amount});
      await sr.finalize(owner.address);

     const  balance1 = await sr.getAccountBalance();
     expect(balance1).to.equal(parseInt(balance)+2);
      
      
      
    });

     it("Should set owner", async function () {
      const { sr, owner,addr1 } = await loadFixture(deploySrFixture);
      
      await sr.setOwner(addr1.address)
       expect(await sr.deployer()).to.equal(addr1.address);
    });
  });

 
});
