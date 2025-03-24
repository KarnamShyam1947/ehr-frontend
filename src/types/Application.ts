export interface Application {
    id: number;
    time: string;
    resumeUrl: string;
    address: string;
    type: 'Doctor' | 'Lab Technician'; 
    status: 'APPLIED' | 'REJECTED' | 'ACCEPTED' | 'REVIEWED'; 
    email: string;
    username: string;
    experience: number;
    trackingId: string;
    phoneNumber: string;
    walletAddress: string;
    specialization: string;
}

export enum ApplicationType {
    DOCTOR = 'DOCTOR',
    LAB_TECHNICIAN = 'LAB_TECHNICIAN'
}

