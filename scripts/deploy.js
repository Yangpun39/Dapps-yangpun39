// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
async function getBalance(address){
  const balanceBigInt= await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
 }

 async function consoleBalance(addresses){
  let count=0;
  for(const address of addresses){
    console.log(`Address ${count} balance:`,await getBalance(address))
    count++;
  }
 }
 async function consoleMemo(memos){
  for(const memo of memos){
    const time=memo.timestamp;
    const name=memo.name;
    const form=memo.from;
    const message=memo.message;
    console.log(`time-${time}, name-${name}, address-${form}, message-${message}`)
  }
 }
async function main() {
const [owner,a1,a2,a3]= await hre.ethers.getSigners();
const chai=await hre.ethers.getContractFactory("chai");
const contract =await chai.deploy();
await contract.deployed();
console.log("address of contract", contract.address);

const addresses=[owner.address,a1.address,a2.address,a3.address];
console.log("before buying ");
await consoleBalance(addresses);

const amount={value: hre.ethers.utils.parseEther("1")};
await contract.connect(a1).buyChai("a1","dami",amount);
await contract.connect(a2).buyChai("a2","dami",amount);
await contract.connect(a3).buyChai("a3","dami",amount);

console.log("after buying ");
await consoleBalance(addresses);

const memo= await contract.getMemos();
consoleMemo(memo);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
