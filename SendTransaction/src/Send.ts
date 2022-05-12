import { ethers } from "ethers";
import { web3 } from "./config";
import createLock from "./SimpleLock";

// define nonce outside function to persist value
let nonce = 0;
// create lock
const lock = createLock("send");

export const sendTx  = async (
  params: ethers.providers.TransactionRequest
)  => {
  try{
    // pause execution with lock
    await lock.acquire()

    // get current nonce perceived by blockchain
    const _nonce = await web3.getTransactionCount();
    nonce = nonce > _nonce ? nonce : _nonce;
    console.log(nonce);

    await web3.sendTransaction({...params, nonce});

    // increase nonce
    nonce+=1;
  } catch(error:any){
    console.error(error.message)
  } finally{
    // release lock
    lock.release();
  }
}
