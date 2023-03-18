import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  //solidity: "0.8.18",
  
    solidity: {
      compilers: [
        {
          version: "0.8.18",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
          },
        },
        {
          version: "0.5.0",
          settings: {
            optimizer: {
              enabled: true,
              runs: 150,
            },
          },
        },
      ],
    },
 
  
};

export default config;
