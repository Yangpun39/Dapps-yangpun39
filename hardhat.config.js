require("@nomicfoundation/hardhat-toolbox");
//require("@nomiclabs/hardhat-waffle");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
const url=process.env.URL;
const key=process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: url,
      accounts: [key]
    },
  },
};
