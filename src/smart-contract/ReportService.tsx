import { ethers } from "ethers";
import { abi } from './Config';
import MySwal from "../config/MySwal";

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

export async function createTestRequest(testName: string) {

    const address = await requestAccount();

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            await contract.requestReport(address, testName);
            MySwal.fire({
                title: "Success",
                text: "Test request created successfully",
                icon: "success"
            });

        } catch (error) {
            console.error("Error creating test request:", error);
            MySwal.fire({
                title: "Error",
                text: "Error creating test request",
                icon: "error"
            })
        }
    }
}

export async function getAllTestRequest() {

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, provider);

        try {
            const reports = await contract.getAllReportRequest();
            console.log("all records : ", reports);
            return reports;
        } catch (error) {
            console.error("Error creating test request:", error);
            MySwal.fire({
                title: "Error",
                text: "Error creating test request",
                icon: "error"
            })
        }
    }
}

export async function getPatientReports() {
    const address = await requestAccount();
    let userReports: any[] = [];

    const reports = await getAllTestRequest();
    console.log("reports : ", reports);
    reports.forEach((report: any) => {
        if (report[0] === address) {
            userReports.push(report);
        }
    });
    return userReports;
}

export async function getLabReports() {
    const address = await requestAccount();
    let userReports: any[] = [];

    const reports = await getAllTestRequest();
    console.log("reports : ", reports);
    reports.forEach((report: any) => {
        if (report[5] === address) {
            userReports.push(report);
        }
    });
    return userReports;
}

export async function acceptRequest(reportId: number) {
    const address = await requestAccount();

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(Object.keys(contract.functions));
       
        try {
            await contract.accecptReportRequest(reportId, address);
            MySwal.fire({
                title: "Success",
                text: "Report request accepted successfully",
                icon: "success"
            });
        } catch (error) {
            console.error("Error accepting report request:", error);
            MySwal.fire({
                title: "Error",
                text: "Error accepting report request",
                icon: "error"
            })
        }
    }
}

export async function uploadTestReport(reportId: number, ipfsHash: string) {
    const address = await requestAccount();

    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const report = await contract.uploadReport(reportId, ipfsHash, address);
            console.log(report);
        } catch (error) {
            console.error("Error getting report:", error);
        }
    }
}

export async function getPatientRecords() {
    const address = await requestAccount();

    const records = await fetchRecords(address || '');
    return records;
}

export async function fetchRecords(address: string) {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, provider);

        try {
            const report = await contract.fetchReports(address);
            console.log(report);
            return report;
        } catch (error) {
            console.error("Error getting report:", error);
            return error;
        }
    }
}
