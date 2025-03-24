import { ethers } from "ethers";
import { abi } from './Config';
import { fetchUserData } from '../services/UserService';
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

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

export async function getUserDetails(id: string) {

    const walletAddress = await requestAccount();

    const userData = await fetchUserData(id || '');

    if (userData.error || userData.role !== 'PATIENT') {
        return userData;
    }

    else {
        if (userData.walletAddress === walletAddress) {
            return userData;
        }

        else {
            if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);
                
                try {
                    const transaction = await contract.hasAccess(walletAddress, userData.walletAddress);
                    await transaction.wait();

                    // Create a Promise that resolves when the event is received
                    const accessResult = await new Promise((resolve) => {
                        contract.once("AccessEvent", (userAddress, patientAddress, flag) => {
                            console.log("Access event received:", { userAddress, patientAddress, flag });
                            if (flag) {
                                resolve(userData);
                            } else {
                                resolve({ error: "You do not have access to this patient's records" });
                            }
                        });

                        // Optional: Add timeout to prevent hanging
                        setTimeout(() => {
                            resolve({ error: "Access check timed out. Please try again." });
                        }, 30000); // 30 second timeout
                    });

                    return accessResult;
                    
                } catch (error) {
                    console.error("Error checking access:", error);
                    return { 
                        error: "Failed to check access. Please ensure you're connected to the correct network and try again." 
                    };
                }
            }
        }
    }
}
