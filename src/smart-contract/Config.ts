export const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "patientAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "flag",
                "type": "bool"
            }
        ],
        "name": "AccessEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "onwer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "UserLogin",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_labAddress",
                "type": "address"
            }
        ],
        "name": "accecptReportRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_patientAddress",
                "type": "address"
            }
        ],
        "name": "fetchReports",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "ipfsHash",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "appliedAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "testDoneAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "testName",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "labTechnicianAddress",
                        "type": "address"
                    }
                ],
                "internalType": "struct EHR.PatientRecordFiles[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllReportRequest",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "patientAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "completedAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "createdAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "testName",
                        "type": "string"
                    },
                    {
                        "internalType": "enum EHR.ReportStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "labTechnicianAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct EHR.ReportRequest[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_patientAddress",
                "type": "address"
            }
        ],
        "name": "grantAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_patientAddress",
                "type": "address"
            }
        ],
        "name": "hasAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_passwordHash",
                "type": "string"
            }
        ],
        "name": "login",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_passwordHash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            }
        ],
        "name": "registerAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_passwordHash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            }
        ],
        "name": "registerDoctor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_passwordHash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            }
        ],
        "name": "registerLabTechnician",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_passwordHash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            }
        ],
        "name": "registerPatient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_patientAddress",
                "type": "address"
            }
        ],
        "name": "removeAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "requestId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_patientAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_testName",
                "type": "string"
            }
        ],
        "name": "requestReport",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_ipfsHash",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_labAddress",
                "type": "address"
            }
        ],
        "name": "uploadReport",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
