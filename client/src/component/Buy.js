import { ethers } from "ethers";

const Buy=({state})=>{
    const  Buychai=async(event)=>{
        event.preventDefault();
     const {contract}=state;//taking out contract instance from state where there are provider signer and contract
   const name=document.querySelector("#name").value;
   const message=document.querySelector("#message").value;
// const [input,setinput]=useState({
//     name:null,
//     message:null
// });
// const [name,message]=event.target.value;
// setinput({
//     name:name,
//     message:message
// })
const amount = { value: ethers.utils.parseEther("0.001") };
const transaction = await contract.buyChai(name, message, amount);
await transaction.wait();
console.log("Transaction is done");
    };
    return (
        <>
          <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
            <form onSubmit={Buychai}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <input
                  type="text"
                  className="form-control"
                  id="message"
                  placeholder="Enter Your Message"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!state.contract}
              >
                Pay
              </button>
            </form>
          </div>
        </>
      );
    };
export default Buy;