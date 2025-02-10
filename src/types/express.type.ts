import { Gender, Status } from ".";


export interface Patient{
  id: number;
  date_of_birth: any;
  adultPatientId: any;
  userId: string;
  name: string;
  email: string;
  contactNumber: string;
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
  appointmentId:String,
  id: String;
  name:String;
  identificationNumber:String;
  gender: String;
  slotDate:String;
  slotTime:String;
  status: Status;
}
export interface Doctor {
  id:any;
  name:string,
  dateOfBirth: any;
  address: string;
  gender:Gender;
  specialization: string;
  yearsOfExperience: number;
  medicalLicenseNumber:string;
  contactNumber: string;
  identificationNumber: string;
}

