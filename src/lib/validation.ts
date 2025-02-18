import { z } from "zod";

export const UserFormValidation = z.object({
  username: z
    .string(),
    // .min(2, "Name must be at least 2 characters")
    // .max(50, "Name must be at most 50 characters")
    // .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain alphanumeric characters and underscores")
    // .regex(/^(?!.*__.*).*$/, "Username cannot have consecutive underscores")
    // .regex(/^[a-zA-Z]/, "Username must start with a letter"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one digit")
    // .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@, $, !, %, *, ?, &, #)")
});


export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
    emergencyContactName: z
    .string()
    .optional()
    .refine(
      (name) => !name || name.length >= 2,
      "Contact name must be at least 2 characters"
    )
    .refine(
      (name) => !name || name.length <= 50,
      "Contact name must be at most 50 characters"
    ),
  emergencyContactNumber: z
    .string()
    .optional()
    .refine(
      (number) => !number || /^\+\d{10,15}$/.test(number),
      "Invalid phone number"
    ),
    identificationNumber: z.string()    
  .min(5, "Id number must be at least 5 characters")
  .max(10, "Address must be at most 500 characters"),
  photo: z.custom<File[]>().optional()
  
  ,
});
export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});
export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export const DoctorFormValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  contactNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.date(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),  // Enforced as required
  address: z.string().min(5, "Address must be at least 5 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  identificationNumber: z.string().min(6, "Identification Number is required"),
  specialization: z.string().min(3, "Specialization must be at least 3 characters long"),
  yearsOfExperience: z.string().min(0, "Years of experience must be a positive number"),
  medicalLicenseNumber: z.string().min(6, "Medical License Number is required"),
});



export const MedicaleRecordValidation = z.object({
  appointmentId: z.string(),
  symptoms: z.string().min(1, "Symptoms are required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  prescription: z.string().optional(),
  treatmentNotes: z.string().optional(),
  allergies: z.string().optional(),
});

export const DrugFormValidation = z.object({
  drug_name: z.string().min(1, "Drug name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  drug_code: z.string().min(1, "Drug code is required"),
  drug_type: z.string().min(1, "Drug type is required"),
});