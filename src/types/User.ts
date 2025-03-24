export interface User {
  id: number;
  name: string;
  role: "PATIENT" | "DOCTOR" | "ADMIN" | "LAB_TECHNICIAN";
  email: string;
  username: string;
  message: string;
  profileUrl: string;
  resumeUrl: string;
  experience: string;
  phoneNumber: string;
  address: string;
  specialization: string;
  walletAddress: string;
}
