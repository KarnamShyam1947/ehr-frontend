import { ethers } from "ethers";
import { abi } from './Config';
import * as authService from "../services/AuthService";
import MySwal from "../config/MySwal";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

// Request MetaMask account access
export async function requestAccount() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return address;

  } else {
    alert("Please install MetaMask!");
  }
}

export async function registerPatient(data:any) {
  
  const walletAddress = await requestAccount();
  data = {...data, walletAddress:walletAddress}

  const resp = await authService.register(data);

  if(resp.statusCode >= 400){
    return resp;
  }
  

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    
    try {
      const transaction = await contract.registerPatient(resp.passwordHash, data.email); 
      console.log("Transaction sent:", transaction);
      await transaction.wait(); 

      return resp;
      
    } catch (error) {
      console.error("Error add the task :", error);
      MySwal.fire({
        title: "Error",
        text: "Error while adding record to blockchain",
        icon: "error"
      })
    }
  }
}

export async function login(data:any) {
  
  const walletAddress = await requestAccount();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    await contract.login(walletAddress, data.password);
  }
  catch(e) {
    console.log(e);
  }

  const resp = await authService.login(walletAddress, data.password);

  return resp;

}

