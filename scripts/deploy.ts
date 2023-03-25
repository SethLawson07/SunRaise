import { ethers } from "hardhat";

async function main() {
  

  
  const Sr = await ethers.getContractFactory("SunRaise");
  const sr = await Sr.deploy();

  await sr.deployed();

  
  console.log(`SunRaise address : ${sr.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
