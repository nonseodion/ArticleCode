import { ethers } from "ethers";
import { config } from "dotenv";
config();

const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
export const web3 = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
