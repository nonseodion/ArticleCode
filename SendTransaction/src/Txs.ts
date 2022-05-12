import { ethers } from "ethers";
import { sendTx } from "./Send";

export const tx1 = async () => {
  // just send ETH
  await sendTx({value: ethers.utils.parseUnits("0.01")});
}

export const tx2 = async () => {
  // just send ETH
  await sendTx({value: ethers.utils.parseUnits("0.001")});
}
