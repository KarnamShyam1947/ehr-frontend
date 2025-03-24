import { User } from "./User";

export interface Appointment {
  id: number;
  date: Date;
  slot: string;
  status: "EXPIRED" | "CREATED" | "ACCEPTED" | "REJECTED" | "CANCELED" | "COMPLETED";
  reason: string;
  doctor: User;
  patient: User;
  rejectionReason: string;
}

