import { Gender, Status } from ".";


export interface Patient{
  date_of_birth: any;
  patient_id: any;
  id(id: any): void;
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  identificationNumber: string;
  nic: string | undefined
}

export interface Appointment {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}


