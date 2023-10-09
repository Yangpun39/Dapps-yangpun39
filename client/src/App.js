import abi from "./contract/chai.json"
import {useState,useEffect} from "react"
import { ethers } from "ethers";
import chai from "./dj.jpg"
import Buy  from "./component/Buy";
import Memos from "./component/Memos";

function App() {
  //contract basic template-------------------------------------------------------------------------------
 const [state,setstate]=useState({
  provider:null,
  signer:null,
  contract:null
 })
 const [account,setaccount]=useState("");
 useEffect(()=>{
  const connectwallet=async()=>{
    const contractaddress="0x76889F0D2DA834f7810b68e5292F6A092247A759";
    const contractabi=abi.abi;
    try{
      const {ethereum}=window;
      if(ethereum){
        const account=await ethereum.request({method:"eth_requestAccounts",})
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

      const provider=new ethers.providers.Web3Provider(ethereum);
      const signer=provider.getSigner();
      const contract=new ethers.Contract(contractaddress,contractabi,signer);
      setaccount(account);
      setstate({provider,signer,contract})
    }else{
      alert("INSTALL METAMASK")
    }
  }
    catch(err){
      console.log(err);
    }
  }
  connectwallet();
 },[])
 console.log(state);
 //till here---------------------------------------------------------------------------------------
 return (
  <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
    <img src={chai} className="img-fluid" alt=".." width="100%" />
    <p
      class="text-muted lead "
      style={{ marginTop: "10px", marginLeft: "5px" }}
    >
      <small>Connected Account - {account}</small>
    </p>
    <div className="container">
      <Buy state={state} />
      <Memos state={state} />
    </div>
  </div>
);
}

export default App;
